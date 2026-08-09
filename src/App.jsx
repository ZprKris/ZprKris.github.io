import ContactFooter from './components/ContactFooter.jsx'
import Navigation from './components/Navigation.jsx'
import { portfolioData } from './data/portfolioData.js'

export default function App() {
  const { introduction } = portfolioData

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation />
      <main id="main-content" tabIndex="-1">
        <section className="container shell-intro" id="top" aria-labelledby="page-title">
          <p className="eyebrow">{introduction.role}</p>
          <h1 id="page-title">{introduction.name}</h1>
          <p className="lede">{introduction.summary}</p>
        </section>
      </main>
      <ContactFooter />
    </>
  )
}
