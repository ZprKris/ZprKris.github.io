import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import TruthGame from './TruthGame.jsx'
import {
  trackGameCompleted,
  trackGameRestarted,
  trackGameStarted,
  trackGameViewed,
  trackGuessSubmitted,
} from '../lib/gameAnalytics.js'

vi.mock('../lib/gameAnalytics.js', () => ({
  trackGameCompleted: vi.fn(() => Promise.resolve(true)),
  trackGameRestarted: vi.fn(() => Promise.resolve(true)),
  trackGameStarted: vi.fn(() => Promise.resolve(true)),
  trackGameViewed: vi.fn(() => Promise.resolve(true)),
  trackGuessSubmitted: vi.fn(() => Promise.resolve(true)),
}))

describe('TruthGame', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows the 30 km correction for option 1', async () => {
    const user = userEvent.setup()
    render(<TruthGame />)
    const optionButton = screen.getByRole('button', { name: /completed a marathon/i })

    await user.click(optionButton)

    expect(screen.getAllByText(/longest run is 30 km/i)[0]).toBeVisible()
    expect(optionButton).toBeDisabled()
    expect(optionButton.closest('.game-option')).toHaveClass('game-option-incorrect')
    expect(optionButton.closest('.game-option').querySelector('.answer-state')).not.toBeInTheDocument()
  })

  it('shades the correct option without adding an answer-state badge', async () => {
    const user = userEvent.setup()
    render(<TruthGame />)
    const optionButton = screen.getByRole('button', { name: /cat has a cheetah coat/i })

    await user.click(optionButton)

    expect(optionButton.closest('.game-option')).toHaveClass('game-option-correct')
    expect(optionButton.closest('.game-option').querySelector('.answer-state')).not.toBeInTheDocument()
  })

  it('shows the 4.0 correction for option 2', async () => {
    const user = userEvent.setup()
    render(<TruthGame />)

    await user.click(screen.getByRole('button', { name: /gpa is 3\.8/i }))

    expect(screen.getAllByText(/full 4\.0/i)[0]).toBeVisible()
  })

  it('reveals the cat, caption, and every explanation for the correct option', async () => {
    const user = userEvent.setup()
    render(<TruthGame />)

    await user.click(screen.getByRole('button', { name: /cat has a cheetah coat/i }))

    expect(screen.getByRole('img', { name: /bengal cat/i })).toBeVisible()
    expect(screen.getByText('A dangerous apex predator.')).toBeVisible()
    expect(screen.getByText(/longest run is 30 km/i)).toBeVisible()
    expect(screen.getByText(/full 4\.0/i)).toBeVisible()
    expect(screen.getAllByText(/meet my dangerous apex predator/i)[0]).toBeVisible()
    for (const button of screen.getAllByRole('button', { name: /completed a marathon|gpa is|cat has/i })) {
      expect(button).toBeDisabled()
    }
    expect(trackGameCompleted).toHaveBeenCalledOnce()
  })

  it('resets the visible UI and creates a new round when playing again', async () => {
    const user = userEvent.setup()
    const { container } = render(<TruthGame />)
    const firstRoundId = container.querySelector('#play').dataset.roundId

    await user.click(screen.getByRole('button', { name: /cat has a cheetah coat/i }))
    await user.click(screen.getByRole('button', { name: /play again/i }))

    expect(screen.queryByRole('img', { name: /bengal cat/i })).not.toBeInTheDocument()
    expect(screen.queryByText(/longest run is 30 km/i)).not.toBeInTheDocument()
    expect(container.querySelector('#play').dataset.roundId).not.toBe(firstRoundId)
    expect(trackGameRestarted).toHaveBeenCalledWith(firstRoundId)
  })

  it('starts once per round, sends guess details, and ignores duplicate clicks', async () => {
    const user = userEvent.setup()
    render(<TruthGame />)
    const marathon = screen.getByRole('button', { name: /completed a marathon/i })

    await user.click(marathon)
    fireEvent.click(marathon)
    await user.click(screen.getByRole('button', { name: /gpa is 3\.8/i }))

    expect(trackGameStarted).toHaveBeenCalledOnce()
    expect(trackGuessSubmitted).toHaveBeenNthCalledWith(1, expect.any(String), 1, false)
    expect(trackGuessSubmitted).toHaveBeenNthCalledWith(2, expect.any(String), 2, false)
    expect(trackGuessSubmitted).toHaveBeenCalledTimes(2)
  })

  it('records a view after at least half of the section is visible', () => {
    let observerCallback
    const disconnect = vi.fn()
    const observe = vi.fn()
    vi.stubGlobal('IntersectionObserver', vi.fn((callback) => {
      observerCallback = callback
      return { observe, disconnect }
    }))

    render(<TruthGame />)
    observerCallback([{ isIntersecting: true, intersectionRatio: 0.5 }])

    expect(observe).toHaveBeenCalledWith(screen.getByRole('region', { name: /one truth/i }))
    expect(trackGameViewed).toHaveBeenCalledOnce()
    expect(disconnect).toHaveBeenCalled()
    vi.unstubAllGlobals()
  })
})
