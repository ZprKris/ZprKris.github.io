import { portfolioData } from '../data/portfolioData.js'

const externalProps = { target: '_blank', rel: 'noreferrer noopener' }

function GmailIcon() {
  return (
    <svg className="footer-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 7.25 12 13.5l8.5-6.25" />
      <path d="M4.5 5.5h15A1.5 1.5 0 0 1 21 7v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17V7a1.5 1.5 0 0 1 1.5-1.5Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="footer-link-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.5 3h-15A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3ZM8.34 18H5.67V9.4h2.67V18ZM7 8.23a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1ZM18.33 18h-2.66v-4.18c0-1-.02-2.28-1.39-2.28-1.39 0-1.61 1.09-1.61 2.21V18H10V9.4h2.56v1.17h.04a2.8 2.8 0 0 1 2.52-1.39c2.7 0 3.21 1.78 3.21 4.09V18Z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className="footer-link-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1.15a11 11 0 0 0-3.48 21.44c.55.1.75-.24.75-.53v-2.12c-3.07.67-3.72-1.3-3.72-1.3-.5-1.28-1.22-1.62-1.22-1.62-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.7-1.48-2.45-.28-5.03-1.23-5.03-5.47 0-1.21.43-2.2 1.13-2.97-.11-.28-.49-1.4.11-2.94 0 0 .92-.3 3.02 1.13a10.45 10.45 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.54.22 2.66.11 2.94.7.77 1.13 1.76 1.13 2.97 0 4.25-2.58 5.18-5.04 5.46.4.34.75 1.01.75 2.04v3.03c0 .29.2.64.76.53A11 11 0 0 0 12 1.15Z" />
    </svg>
  )
}

function ResumeIcon() {
  return (
    <svg className="footer-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3.5h8l4 4V20.5H6Z" />
      <path d="M14 3.5v4h4M9 12h6M9 15.5h6" />
    </svg>
  )
}

export default function ContactFooter() {
  const { contact } = portfolioData

  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-layout">
        <div className="footer-primary">
          <p className="eyebrow">Contact</p>
          {/* <h2>{contact.invitation}</h2> */}
          <nav aria-label="Contact links">
            <ul className="footer-links">
              <li><a href={`mailto:${contact.email}`}><GmailIcon />Email</a></li>
              <li><a href={contact.linkedin} {...externalProps}><LinkedInIcon />LinkedIn</a></li>
              <li><a href={contact.github} {...externalProps}><GitHubIcon />GitHub</a></li>
              <li><a href={contact.resume} target="_blank" rel="noreferrer"><ResumeIcon />Resume</a></li>
            </ul>
          </nav>
        </div>
        <div className="footer-meta">
          {/* <p className="privacy-note">Anonymous game interactions may be counted. No personal information is collected.</p> */}
          <p className="copyright">© {new Date().getFullYear()} Kristina Zaporozhets</p>
        </div>
      </div>
    </footer>
  )
}
