export default function Footer({ content }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {content.name}
        </p>
        <nav className="footer-links" aria-label="Footer">
          <a href={content.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={content.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${content.email}`}>Email</a>
        </nav>
        <p className="muted">Built with React and Node.js</p>
      </div>
    </footer>
  )
}
