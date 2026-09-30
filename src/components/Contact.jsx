export default function Contact({ email, github }) {
  return (
    <section className="section container" id="contact" aria-labelledby="contact-heading">
      <p className="eyebrow">Contact</p>
      <h2 id="contact-heading">Get in touch</h2>
      <p className="contact-copy">
        The fastest way to reach me is email. You can also find my code on GitHub.
      </p>
      <div className="contact-actions">
        <a className="button button-primary" href={`mailto:${email}`}>
          {email}
        </a>
        <a className="button button-secondary" href={github} target="_blank" rel="noopener noreferrer">
          GitHub profile
          <span aria-hidden="true"> ↗</span>
        </a>
      </div>
    </section>
  )
}
