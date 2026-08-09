const links = [
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Play', href: '#play' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation({ theme, setTheme }) {
  const isDark = theme === 'dark'

  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Kristina Zaporozhets, back to top">
          KZ<span aria-hidden="true">.</span>
        </a>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          aria-pressed={isDark}
        >
          {isDark ? 'Light mode' : 'Night mode'}
        </button>
      </nav>
    </header>
  )
}
