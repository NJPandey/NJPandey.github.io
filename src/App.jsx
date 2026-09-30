import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [content, setContent] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    fetch('content.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => active && setContent(data))
      .catch((err) => active && setError(err))
    return () => {
      active = false
    }
  }, [])

  if (error) {
    return (
      <main className="status-page">
        <p role="alert">The site content could not be loaded.</p>
        <button type="button" className="button button-secondary" onClick={() => window.location.reload()}>
          Try again
        </button>
      </main>
    )
  }

  if (!content) {
    return (
      <main className="status-page">
        <p className="muted">Loading…</p>
      </main>
    )
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header name={content.name} github={content.github} />
      <main id="main">
        <Hero content={content} />
        <Work projects={content.projects} />
        <About paragraphs={content.about} skills={content.skills} />
        <Contact email={content.email} github={content.github} />
      </main>
      <Footer name={content.name} />
    </>
  )
}
