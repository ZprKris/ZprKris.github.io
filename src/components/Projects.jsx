import { portfolioData } from '../data/portfolioData.js'

const externalProps = { target: '_blank', rel: 'noreferrer noopener' }

function ProjectLink({ href, children }) {
  if (!href) return null

  return (
    <a className="project-link" href={href} {...externalProps}>
      {children} <span aria-hidden="true">↗</span>
    </a>
  )
}

export default function Projects() {
  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <h2 id="projects-heading">Projects</h2>
        <div className="projects-list">
          {portfolioData.projects.map((project) => (
            <article className="featured-project" key={project.name}>
              <div className="project-visual">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  width={project.imageWidth}
                  height={project.imageHeight}
                  loading="lazy"
                />
              </div>
              <div className="project-copy">
                <div className="project-title-row">
                  <h3>{project.name}</h3>
                  {/* <span className="project-number" aria-hidden="true">01</span> */}
                </div>
                <p className="project-tagline">{project.tagline}</p>
                <div className="project-summary-cards">
                  <div className="summary-card">
                    <h4>Problem</h4>
                    <p>{project.problem}</p>
                  </div>
                  <div className="summary-card">
                    <h4>Solution</h4>
                    <p>{project.solution}</p>
                  </div>
                </div>
                {/* <p className="project-details">{project.details}</p> */}
                <ul className="technology-list" aria-label={`${project.name} technologies`}>
                  {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
                <div className="project-links">
                  <ProjectLink href={project.liveUrl}>Open TTC Watch</ProjectLink>
                  <ProjectLink href={project.sourceUrl}>View source</ProjectLink>
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
