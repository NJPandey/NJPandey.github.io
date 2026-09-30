import { Component, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'

const NeuralCanvas = lazy(() => import('./NeuralCanvas.jsx'))

// A rejected lazy chunk (stale cache after a deploy) must not take the whole
// page down; the canvas is decorative, so render nothing instead.
class CanvasBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function Hero({ content, theme }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <div className="hero-canvas" aria-hidden="true">
        <CanvasBoundary>
          <Suspense fallback={null}>
            <NeuralCanvas theme={theme} key={theme} />
          </Suspense>
        </CanvasBoundary>
      </div>
      <div className="container hero-content">
        <p className="eyebrow">
          {content.role} · {content.company} · {content.location}
        </p>
        <h1 id="hero-name">{content.name}</h1>
        <p className="intro">{content.intro}</p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/work">
            View my work
          </Link>
          <a className="button button-secondary" href={`mailto:${content.email}`}>
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}
