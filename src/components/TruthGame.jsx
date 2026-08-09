import { useEffect, useRef, useState } from 'react'
import catImage from '../assets/cat.webp'
import { portfolioData } from '../data/portfolioData.js'
import {
  trackGameCompleted,
  trackGameRestarted,
  trackGameStarted,
  trackGameViewed,
  trackGuessSubmitted,
} from '../lib/gameAnalytics.js'

const newRoundId = () => crypto.randomUUID()

function focusAndCenter(element, block) {
  if (!element) return

  element.focus({ preventScroll: true })
  if (typeof element.scrollIntoView === 'function') {
    const reduceMotion = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block })
  }
}

export default function TruthGame() {
  const { game } = portfolioData
  const [selectedOptions, setSelectedOptions] = useState(() => new Set())
  const [isComplete, setIsComplete] = useState(false)
  const [roundId, setRoundId] = useState(newRoundId)
  const [announcement, setAnnouncement] = useState('')
  const sectionRef = useRef(null)
  const catRevealRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          void trackGameViewed(roundId)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [roundId])

  useEffect(() => {
    if (isComplete) focusAndCenter(catRevealRef.current, 'center')
  }, [isComplete])

  function chooseOption(option) {
    if (isComplete || selectedOptions.has(option.id)) return

    if (selectedOptions.size === 0) void trackGameStarted(roundId)
    void trackGuessSubmitted(roundId, option.id, option.isCorrect)
    setSelectedOptions((current) => new Set(current).add(option.id))
    setAnnouncement(option.response)

    if (option.isCorrect) {
      void trackGameCompleted(roundId)
      setIsComplete(true)
    }
  }

  function restartGame() {
    void trackGameRestarted(roundId)
    setSelectedOptions(new Set())
    setIsComplete(false)
    setRoundId(newRoundId())
    setAnnouncement('New round started. Choose a statement.')
    queueMicrotask(() => focusAndCenter(sectionRef.current, 'start'))
  }

  return (
    <section ref={sectionRef} className="game-section" id="play" aria-labelledby="play-heading" data-round-id={roundId} tabIndex="-1">
      <div className="container game-layout">
        <div className="game-intro">
          <h2 id="play-heading" className="section-heading">Play</h2>
          <p className="game-intro-txt">{game.prompt}</p>
          {/* <p className="eyebrow">A small intermission</p> */}
          <h3 id="game-heading">{game.heading}</h3>
        </div>

        <div className="game-board">
          {!isComplete ? (
            <div className="game-options" role="group" aria-label={game.prompt}>
              {game.options.map((option) => {
                const wasSelected = selectedOptions.has(option.id)
                const revealResponse = wasSelected || isComplete
                const state = wasSelected
                  ? option.isCorrect ? 'correct' : 'incorrect'
                  : isComplete ? 'locked' : 'idle'

                return (
                  <div className={`game-option game-option-${state}`} key={option.id}>
                    <button
                      type="button"
                      onClick={() => chooseOption(option)}
                      disabled={isComplete || wasSelected}
                      aria-describedby={revealResponse ? `option-${option.id}-response` : undefined}
                    >
                      <span className="option-number" aria-hidden="true">0{option.id}</span>
                      <span>{option.statement}</span>
                    </button>
                    {revealResponse && (
                      <p className="option-response" id={`option-${option.id}-response`}>
                        {option.response}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="cat-reveal">
              <p className="option-response cat-reveal-message" id="cat-reveal-message">
                Correct. Meet my dangerous apex predator.
              </p>
              <button
                ref={catRevealRef}
                className="cat-reveal-trigger"
                type="button"
                onClick={restartGame}
                aria-label="Play again"
                aria-describedby="cat-reveal-message"
              >
                <img
                  src={catImage}
                  alt="Kristina’s Bengal cat relaxing between two computer monitors"
                  width="400"
                  height="400"
                  loading="lazy"
                />
                <span className="cat-replay-overlay" aria-hidden="true">Play again</span>
              </button>
            </div>
          )}

          <div className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</div>
        </div>
      </div>
    </section>
  )
}

export { newRoundId }
