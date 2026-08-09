import { portfolioData } from '../data/portfolioData.js'

export default function Experience() {
  return (
    <section className="story-list-section experience-section" id="experience" aria-labelledby="experience-heading">
      <div className="container">
        {/* <p className="eyebrow">Work</p> */}
        <h2 className="section-heading" id="experience-heading">Experience</h2>
        <ol className="timeline">
          {portfolioData.experience.map((item) => (
            <li className="timeline-item" key={`${item.company}-${item.dates}`}>
              <div className="entry-heading">
                <div>
                  <h3>{item.company}</h3>
                  <p className="entry-role">{item.role}</p>
                </div>
                <p className="entry-dates">{item.dates}</p>
              </div>
              <p className="entry-description">{item.description}</p>
              {item.metrics && (
                <ul className="metrics" aria-label="Performance improvements">
                  {item.metrics.map((metric) => <li key={metric}>{metric}</li>)}
                </ul>
              )}
              {item.projectUrl && (
                <a className="project-link experience-project-link" href={item.projectUrl} target="_blank" rel="noreferrer noopener">
                  View project <span aria-hidden="true">↗</span>
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
