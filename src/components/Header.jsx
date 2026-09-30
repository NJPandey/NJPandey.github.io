import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
]

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Header({ name, theme, onToggleTheme }) {
  const location = useLocation()
  const onHome = location.pathname === '/'
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (!onHome) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [onHome])

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="wordmark" to="/" aria-label="Home">
          {name}
        </Link>
        <div className="header-actions">
          <nav className="site-nav" aria-label="Primary">
            {SECTIONS.map(({ id, label }) => (
              <Link key={id} to={`/#${id}`} className={onHome && activeSection === id ? 'active' : ''}>
                {label}
              </Link>
            ))}
            <NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')}>
              Blog
            </NavLink>
          </nav>
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            aria-pressed={theme === 'dark'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  )
}
