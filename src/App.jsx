import { useEffect, useState } from 'react'
import ContactFooter from './components/ContactFooter.jsx'
import Navigation from './components/Navigation.jsx'
import Projects from './components/Projects.jsx'
import StoryLayout from './components/StoryLayout.jsx'
import TruthGame from './components/TruthGame.jsx'
import './styles/components.css'

const THEME_KEY = 'portfolio-theme'

export default function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY)
    const initial = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(initial)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', theme === 'dark')
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.classList.add('reveal-js')

    const revealSections = document.querySelectorAll('section')
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' }
    )

    revealSections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation theme={theme} setTheme={setTheme} />
      <main id="main-content" tabIndex="-1" aria-labelledby="page-title">
        <StoryLayout />
        <Projects />
        <TruthGame />
      </main>
      <ContactFooter />
    </>
  )
}
