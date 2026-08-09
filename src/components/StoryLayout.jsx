// import plantImage from '../assets/snake-plant.png'
import { useEffect, useState } from 'react'
import { portfolioData } from '../data/portfolioData.js'
import Education from './Education.jsx'
import Experience from './Experience.jsx'
import PortraitPanel from './PortraitPanel.jsx'

export default function StoryLayout() {
  const { introduction } = portfolioData
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const updateScrollCue = () => setHasScrolled(window.scrollY > 64)

    updateScrollCue()
    window.addEventListener('scroll', updateScrollCue, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollCue)
  }, [])

  return (
    <>
      <section className="story-section" aria-label="Introduction">
        {/* <div className="plant-backdrop" aria-hidden="true">
          <img src={plantImage} alt="" />
        </div> */}
        <div className="story-layout container">
          <div className="story-intro" id="top">
            {/* <p className="eyebrow">{introduction.role}</p> */}
            <h1 id="page-title">{introduction.name}</h1>
            <p className="lede">{introduction.summary}</p>
          </div>
          <PortraitPanel />
          <a
            className={`scroll-invitation${hasScrolled ? ' scroll-invitation-hidden' : ''}`}
            href="#experience"
            aria-hidden={hasScrolled}
            tabIndex={hasScrolled ? -1 : undefined}
          >
            Scroll to explore <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <Experience />
      <Education />
    </>
  )
}
