# Kristina Zaporozhets — Portfolio

Personal portfolio for Kristina Zaporozhets, built with React and Vite and hosted at [zprkris.github.io](https://zprkris.github.io).

## Local development

Requires Node.js 20 or newer.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Add the Supabase project URL and publishable key to `.env.local` to record anonymous game interactions. The game works normally when these values are absent.

## Verification

```sh
npm test
npm run build
```

## Anonymous game analytics

The database migration is in [`supabase/migrations/202608080001_create_game_events.sql`](supabase/migrations/202608080001_create_game_events.sql). Apply it through the Supabase SQL Editor or a linked Supabase CLI project. Only anonymous inserts are permitted; browser clients cannot read, update, or delete event rows.

No names, email addresses, user-agent strings, referrers, locations, or free-form text are collected. See [`docs/game-analytics.md`](docs/game-analytics.md) for setup and reporting instructions.

## Deployment

GitHub Pages deployment runs from `.github/workflows/deploy-pages.yml`. Configure these repository variables before running the workflow:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

The workflow installs dependencies, runs tests, creates the production build, and deploys the `dist` artifact only after verification succeeds.
