create extension if not exists pgcrypto;

create table public.game_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  round_id uuid not null,
  event_type text not null,
  option_id smallint,
  is_correct boolean,
  created_at timestamptz not null default now(),
  constraint game_events_event_type_check check (
    event_type in (
      'game_viewed',
      'game_started',
      'guess_submitted',
      'game_completed',
      'game_restarted'
    )
  ),
  constraint game_events_option_id_check check (
    option_id is null or option_id between 1 and 3
  ),
  constraint game_events_payload_check check (
    (
      event_type = 'guess_submitted'
      and option_id is not null
      and is_correct is not null
    )
    or (
      event_type <> 'guess_submitted'
      and option_id is null
      and is_correct is null
    )
  )
);

create unique index game_events_one_view_per_session_idx
  on public.game_events (session_id)
  where event_type = 'game_viewed';

create unique index game_events_one_start_per_round_idx
  on public.game_events (round_id)
  where event_type = 'game_started';

create unique index game_events_one_completion_per_round_idx
  on public.game_events (round_id)
  where event_type = 'game_completed';

create unique index game_events_one_guess_per_option_idx
  on public.game_events (round_id, option_id)
  where event_type = 'guess_submitted';

alter table public.game_events enable row level security;
alter table public.game_events force row level security;

revoke all on table public.game_events from public, anon, authenticated;
grant insert on table public.game_events to anon;

create policy "Anonymous visitors insert valid game events"
  on public.game_events
  for insert
  to anon
  with check ((select auth.role()) = 'anon');

comment on table public.game_events is
  'Anonymous portfolio game interactions. Contains no visitor identity or free-form data.';
