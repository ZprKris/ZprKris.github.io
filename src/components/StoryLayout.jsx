import plantImage from '../assets/snake-plant.png'
import { portfolioData } from '../data/portfolioData.js'
import Education from './Education.jsx'
import Experience from './Experience.jsx'
import PortraitPanel from './PortraitPanel.jsx'

export default function StoryLayout() {
  const { introduction } = portfolioData

  return (
    <section className="story-section" aria-label="Introduction, experience, and education">
      <div className="plant-backdrop" aria-hidden="true">
        <img src={plantImage} alt="" />
      </div>
      <div className="story-layout container">
        <div className="story-intro" id="top">
          <p className="eyebrow">{introduction.role}</p>
          <h1 id="page-title">{introduction.name}</h1>
          <p className="lede">{introduction.summary}</p>
          <a className="scroll-invitation" href="#experience">
            Scroll to explore <span aria-hidden="true">↓</span>
          </a>
        </div>
        <PortraitPanel />
        <div className="story-copy">
          <Experience />
          <Education />
        </div>
      </div>
    </section>
  )
}
