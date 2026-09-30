export default function Footer({ name }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {name}
        </p>
        <p className="muted">Built with React and Node.js</p>
      </div>
    </footer>
  )
}
