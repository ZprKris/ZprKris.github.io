import { portfolioData } from '../data/portfolioData.js'

const externalProps = { target: '_blank', rel: 'noreferrer noopener' }

export default function ContactFooter() {
  const { contact } = portfolioData

  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-layout">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>{contact.invitation}</h2>
        </div>
        <nav aria-label="Contact links">
          <ul className="footer-links">
            <li><a href={`mailto:${contact.email}`}>Email</a></li>
            <li><a href={contact.linkedin} {...externalProps}>LinkedIn <span aria-hidden="true">↗</span></a></li>
            <li><a href={contact.github} {...externalProps}>GitHub <span aria-hidden="true">↗</span></a></li>
            <li><a href={contact.resume} target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a></li>
          </ul>
        </nav>
        <p className="privacy-note">Anonymous game interactions may be counted. No personal information is collected.</p>
        <p className="copyright">© {new Date().getFullYear()} Kristina Zaporozhets</p>
      </div>
    </footer>
  )
}
