import { useState } from 'react'
import catImage from '../assets/cat.webp'
import { portfolioData } from '../data/portfolioData.js'

const newRoundId = () => crypto.randomUUID()

export default function TruthGame() {
  const { game } = portfolioData
  const [selectedOptions, setSelectedOptions] = useState(() => new Set())
  const [isComplete, setIsComplete] = useState(false)
  const [roundId, setRoundId] = useState(newRoundId)
  const [announcement, setAnnouncement] = useState('')

  function chooseOption(option) {
    if (isComplete || selectedOptions.has(option.id)) return

    setSelectedOptions((current) => new Set(current).add(option.id))
    setAnnouncement(option.response)

    if (option.isCorrect) {
      setIsComplete(true)
    }
  }

  function restartGame() {
    setSelectedOptions(new Set())
    setIsComplete(false)
    setRoundId(newRoundId())
    setAnnouncement('New round started. Choose a statement.')
  }

  return (
    <section className="game-section" id="play" aria-labelledby="game-heading" data-round-id={roundId}>
      <div className="container game-layout">
        <div className="game-intro">
          <p className="eyebrow">A small intermission</p>
          <h2 id="game-heading">{game.heading}</h2>
          <p>{game.prompt}</p>
        </div>

        <div className="game-board">
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
                    {state === 'correct' && <span className="answer-state">Correct ✓</span>}
                    {state === 'incorrect' && <span className="answer-state">Not this one ×</span>}
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

          <div className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</div>

          {isComplete && (
            <div className="cat-reveal">
              <figure>
                <img
                  src={catImage}
                  alt="Kristina’s Bengal cat relaxing between two computer monitors"
                  width="900"
                  height="1200"
                  loading="lazy"
                />
                <figcaption>A dangerous apex predator.</figcaption>
              </figure>
              <button className="play-again" type="button" onClick={restartGame}>Play again</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export { newRoundId }
