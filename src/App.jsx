import ContactFooter from './components/ContactFooter.jsx'
import Navigation from './components/Navigation.jsx'
import Projects from './components/Projects.jsx'
import StoryLayout from './components/StoryLayout.jsx'
import './styles/components.css'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation />
      <main id="main-content" tabIndex="-1" aria-labelledby="page-title">
        <StoryLayout />
        <Projects />
      </main>
      <ContactFooter />
    </>
  )
}
