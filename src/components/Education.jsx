import { portfolioData } from '../data/portfolioData.js'

export default function Education() {
  return (
    <section className="story-list-section education-section" id="education" aria-labelledby="education-heading">
      <p className="eyebrow">Learning</p>
      <h2 className="section-heading" id="education-heading">Education</h2>
      <ol className="timeline compact-timeline">
        {portfolioData.education.map((item) => (
          <li className="timeline-item" key={`${item.school}-${item.dates}`}>
            <div className="entry-heading">
              <div>
                <h3>{item.school}</h3>
                <p className="entry-role">{item.degree}</p>
              </div>
              <p className="entry-dates">{item.dates}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
