import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  insert: vi.fn(),
  from: vi.fn(),
}))

vi.mock('./supabase.js', () => ({
  supabase: { from: mocks.from },
}))

import {
  getSessionId,
  resetAnalyticsMemoryForTests,
  SESSION_KEY,
  trackGameCompleted,
  trackGameStarted,
  trackGameViewed,
  trackGuessSubmitted,
} from './gameAnalytics.js'

describe('gameAnalytics', () => {
  beforeEach(() => {
    sessionStorage.clear()
    resetAnalyticsMemoryForTests()
    mocks.insert.mockReset().mockResolvedValue({ error: null })
    mocks.from.mockReset().mockReturnValue({ insert: mocks.insert })
  })

  it('keeps one anonymous session ID for the browser session', () => {
    const firstId = getSessionId()

    expect(getSessionId()).toBe(firstId)
    expect(sessionStorage.getItem(SESSION_KEY)).toBe(firstId)
  })

  it('records game_viewed only once per session', async () => {
    await trackGameViewed(crypto.randomUUID())
    await trackGameViewed(crypto.randomUUID())

    expect(mocks.insert).toHaveBeenCalledOnce()
    expect(mocks.insert).toHaveBeenCalledWith(expect.objectContaining({ event_type: 'game_viewed' }))
  })

  it('records game_started and game_completed only once per round', async () => {
    const roundId = crypto.randomUUID()

    await trackGameStarted(roundId)
    await trackGameStarted(roundId)
    await trackGameCompleted(roundId)
    await trackGameCompleted(roundId)

    expect(mocks.insert).toHaveBeenCalledTimes(2)
  })

  it('includes option ID and correctness and prevents duplicate guesses', async () => {
    const roundId = crypto.randomUUID()

    await trackGuessSubmitted(roundId, 2, false)
    await trackGuessSubmitted(roundId, 2, false)

    expect(mocks.insert).toHaveBeenCalledOnce()
    expect(mocks.insert).toHaveBeenCalledWith(expect.objectContaining({
      event_type: 'guess_submitted',
      round_id: roundId,
      option_id: 2,
      is_correct: false,
    }))
  })

  it('swallows failed analytics writes', async () => {
    mocks.insert.mockResolvedValue({ error: new Error('offline') })

    await expect(trackGameStarted(crypto.randomUUID())).resolves.toBe(false)
  })
})
