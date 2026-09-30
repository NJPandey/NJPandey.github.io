import { lazy, Suspense } from 'react'

const NeuralCanvas = lazy(() => import('./NeuralCanvas.jsx'))

export default function Hero({ content, theme }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <div className="hero-canvas" aria-hidden="true">
        <Suspense fallback={null}>
          <NeuralCanvas theme={theme} key={theme} />
        </Suspense>
      </div>
      <div className="container hero-content">
        <p className="eyebrow">
          {content.role} · {content.company} · {content.location}
        </p>
        <h1 id="hero-name">{content.name}</h1>
        <p className="intro">{content.intro}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            View my work
          </a>
          <a className="button button-secondary" href={`mailto:${content.email}`}>
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}
