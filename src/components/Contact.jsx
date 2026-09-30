import Reveal from './Reveal.jsx'

export default function Contact({ email, github, linkedin }) {
  return (
    <section className="section container" id="contact" aria-labelledby="contact-heading">
      <Reveal>
        <p className="eyebrow">Contact</p>
        <h2 id="contact-heading">Get in touch</h2>
      </Reveal>
      <Reveal delay={80}>
        <p className="contact-copy">
          The fastest way to reach me is email. You can also find my code on GitHub
          and my professional history on LinkedIn.
        </p>
        <div className="contact-actions">
          <a className="button button-primary" href={`mailto:${email}`}>
            {email}
          </a>
          <a className="button button-secondary" href={github} target="_blank" rel="noopener noreferrer">
            GitHub
            <span aria-hidden="true"> ↗</span>
          </a>
          <a className="button button-secondary" href={linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
            <span aria-hidden="true"> ↗</span>
          </a>
        </div>
      </Reveal>
    </section>
  )
}
