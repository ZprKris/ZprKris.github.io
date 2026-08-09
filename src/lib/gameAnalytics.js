import { supabase } from './supabase.js'

const SESSION_KEY = 'kz-portfolio-game-session'
const VIEWED_KEY = 'kz-portfolio-game-viewed'
const sentEvents = new Set()
let memorySessionId

function createId() {
  return crypto.randomUUID()
}

export function getSessionId() {
  try {
    const savedId = sessionStorage.getItem(SESSION_KEY)
    if (savedId) return savedId

    const sessionId = createId()
    sessionStorage.setItem(SESSION_KEY, sessionId)
    return sessionId
  } catch {
    memorySessionId ??= createId()
    return memorySessionId
  }
}

function eventKey(eventType, roundId, optionId = '') {
  if (eventType === 'game_viewed') return `${getSessionId()}:game_viewed`
  return `${roundId}:${eventType}:${optionId}`
}

async function insertEvent(payload) {
  if (!supabase) return false

  try {
    const { error } = await supabase.from('game_events').insert(payload)
    if (error) throw error
    return true
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Anonymous game analytics could not be recorded.', error)
    }
    return false
  }
}

export function trackEvent(eventType, roundId, details = {}) {
  const key = eventKey(eventType, roundId, details.option_id)
  if (sentEvents.has(key)) return Promise.resolve(false)

  if (eventType === 'game_viewed') {
    try {
      if (sessionStorage.getItem(VIEWED_KEY)) return Promise.resolve(false)
      sessionStorage.setItem(VIEWED_KEY, 'true')
    } catch {
      // The in-memory duplicate set still prevents repeat sends when storage is unavailable.
    }
  }

  sentEvents.add(key)
  return insertEvent({
    session_id: getSessionId(),
    round_id: roundId,
    event_type: eventType,
    ...details,
  })
}

export const trackGameViewed = (roundId) => trackEvent('game_viewed', roundId)
export const trackGameStarted = (roundId) => trackEvent('game_started', roundId)
export const trackGuessSubmitted = (roundId, optionId, isCorrect) =>
  trackEvent('guess_submitted', roundId, { option_id: optionId, is_correct: isCorrect })
export const trackGameCompleted = (roundId) => trackEvent('game_completed', roundId)
export const trackGameRestarted = (roundId) => trackEvent('game_restarted', roundId)

export function resetAnalyticsMemoryForTests() {
  sentEvents.clear()
  memorySessionId = undefined
}

export { SESSION_KEY, VIEWED_KEY, insertEvent }
