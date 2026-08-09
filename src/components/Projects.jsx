import { portfolioData } from '../data/portfolioData.js'

const externalProps = { target: '_blank', rel: 'noreferrer noopener' }

function ExternalLinkIcon() {
  return (
    <svg className="project-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 5H19V10" />
      <path d="M10 14L19 5" />
      <path d="M19 13V19H5V5H11" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className="project-link-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1.15a11 11 0 0 0-3.48 21.44c.55.1.75-.24.75-.53v-2.12c-3.07.67-3.72-1.3-3.72-1.3-.5-1.28-1.22-1.62-1.22-1.62-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.7-1.48-2.45-.28-5.03-1.23-5.03-5.47 0-1.21.43-2.2 1.13-2.97-.11-.28-.49-1.4.11-2.94 0 0 .92-.3 3.02 1.13a10.45 10.45 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.54.22 2.66.11 2.94.7.77 1.13 1.76 1.13 2.97 0 4.25-2.58 5.18-5.04 5.46.4.34.75 1.01.75 2.04v3.03c0 .29.2.64.76.53A11 11 0 0 0 12 1.15Z" />
    </svg>
  )
}

function ProjectLink({ href, children, icon }) {
  if (!href) return null

  return (
    <a className="project-link" href={href} {...externalProps}>
      {icon}
      {children}
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
                  <ProjectLink href={project.liveUrl} icon={<ExternalLinkIcon />}>Live</ProjectLink>
                  <ProjectLink href={project.sourceUrl} icon={<GitHubIcon />}>GitHub</ProjectLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export { GitHubIcon, ProjectLink }
