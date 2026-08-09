import ttcWatchImage from '../assets/ttc-watch.png'
import { portfolioData } from '../data/portfolioData.js'

const externalProps = { target: '_blank', rel: 'noreferrer noopener' }

function ProjectLink({ href, children, secondary = false }) {
  if (!href) return null

  return (
    <a className={`project-link${secondary ? ' project-link-secondary' : ''}`} href={href} {...externalProps}>
      {children} <span aria-hidden="true">↗</span>
    </a>
  )
}

export default function Projects() {
  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <p className="eyebrow">Selected work</p>
        <h2 id="projects-heading">Projects</h2>
        <div className="projects-list">
          {portfolioData.projects.map((project) => (
            <article className="featured-project" key={project.name}>
              <div className="project-visual">
                <img
                  src={ttcWatchImage}
                  alt="TTC Watch subway map and monitoring preferences interface"
                  width="1829"
                  height="884"
                  loading="lazy"
                />
              </div>
              <div className="project-copy">
                <div className="project-title-row">
                  <h3>{project.name}</h3>
                  <span className="project-number" aria-hidden="true">01</span>
                </div>
                <p className="project-tagline">{project.tagline}</p>
                <dl className="project-summary">
                  <div>
                    <dt>Problem</dt>
                    <dd>{project.problem}</dd>
                  </div>
                  <div>
                    <dt>Solution</dt>
                    <dd>{project.solution}</dd>
                  </div>
                </dl>
                <p className="project-details">{project.details}</p>
                <ul className="technology-list" aria-label={`${project.name} technologies`}>
                  {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
                <div className="project-links">
                  <ProjectLink href={project.liveUrl}>Open TTC Watch</ProjectLink>
                  <ProjectLink href={project.sourceUrl} secondary>View source</ProjectLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export { ProjectLink }
