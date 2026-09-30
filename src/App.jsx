import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollToHash from './components/ScrollToHash.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Home from './pages/Home.jsx'
import Blog from './pages/Blog.jsx'
import Post from './pages/Post.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const [content, setContent] = useState(null)
  const [error, setError] = useState(null)
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // storage unavailable (private mode) - theme simply won't persist
    }
  }, [theme])

  useEffect(() => {
    let active = true
    fetch('/content.json')
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
      <Header
        name={content.name}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      />
      <ScrollToHash />
      <ScrollProgress />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home content={content} theme={theme} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer content={content} />
    </>
  )
}
