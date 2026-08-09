-- Anonymous sessions that played
select count(distinct session_id) as unique_playing_sessions
from public.game_events
where event_type = 'game_started';

-- Plays by day
select
  created_at::date as play_date,
  count(distinct session_id) as unique_playing_sessions
from public.game_events
where event_type = 'game_started'
group by created_at::date
order by play_date desc;

-- Guess distribution
select
  option_id,
  count(*) as guesses
from public.game_events
where event_type = 'guess_submitted'
group by option_id
order by option_id;

-- Completed sessions
select count(distinct session_id) as completed_sessions
from public.game_events
where event_type = 'game_completed';

-- Viewed compared with played
select
  count(distinct session_id) filter (
    where event_type = 'game_viewed'
  ) as viewed_sessions,
  count(distinct session_id) filter (
    where event_type = 'game_started'
  ) as playing_sessions
from public.game_events;
