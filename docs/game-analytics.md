# Anonymous game analytics

The “One truth, two lies” game records a small set of anonymous interaction events. A visitor counts as having played only after selecting an answer; merely seeing the game does not count as a play.

These records describe anonymous browser sessions, not identified individuals. The table contains random session and round UUIDs, event names, answer numbers, correctness, and timestamps. It does not collect names, email addresses, locations, referrers, user-agent strings, or visitor-written text.

## Apply the migration

1. Open the `rwyprtatzvdgbtukyriu` project in Supabase.
2. Open **SQL Editor** and create a new query.
3. Copy the complete contents of `supabase/migrations/202608080001_create_game_events.sql` into the query.
4. Review it, then select **Run**.

The migration creates `public.game_events`, validation constraints, partial unique indexes, and Row Level Security. The `anon` role receives insert permission only. Neither anonymous nor authenticated browser users receive select, update, or delete permission.

Do not add a service-role key or database password to the portfolio, environment files, or GitHub repository variables.

## View recent events

1. Open the Supabase project.
2. Open **Table Editor**.
3. Select `game_events`.
4. Sort `created_at` descending to see the latest events.

Table Editor access uses your signed-in Supabase dashboard permissions. Event rows are deliberately unavailable through the public browser API.

## Run analytics queries

1. Open **SQL Editor**.
2. Create a new query.
3. Open `supabase/analytics_queries.sql` in this repository.
4. Copy the report you want into SQL Editor and select **Run**.

The saved reports show:

- anonymous sessions that started the game;
- unique playing sessions by day;
- guesses by answer number;
- sessions that completed the game;
- viewed sessions compared with playing sessions.

Counts represent anonymous browser sessions. They do not represent verified people and may include the same person in multiple browser sessions.

## Verify browser permissions

After applying the migration and deploying the site:

1. Open the live portfolio and scroll until at least half of the game is visible.
2. Select an incorrect answer, then the correct answer.
3. In Table Editor, confirm `game_viewed`, `game_started`, two `guess_submitted`, and `game_completed` rows share the expected anonymous session and round IDs.
4. Select **Play again** and confirm a `game_restarted` event appears and later events use a new round UUID.
5. Confirm the live game still works with network access disabled; analytics failures must remain invisible to visitors.

To validate API restrictions, make REST requests with the project publishable key and no signed-in user. A valid `POST /rest/v1/game_events` should return success. `GET`, `PATCH`, and `DELETE` requests must not expose or alter rows. Invalid event names, invalid answer numbers, and non-guess events containing answer data must fail database validation.
