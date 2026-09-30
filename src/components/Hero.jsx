export default function Hero({ content }) {
  return (
    <section className="hero container" id="top" aria-labelledby="hero-name">
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
    </section>
  )
}
