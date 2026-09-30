import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section container">
      <p className="eyebrow">404</p>
      <h2>Page not found</h2>
      <p className="muted">The page you're looking for doesn't exist.</p>
      <p>
        <Link className="text-link" to="/">
          ← Back to home
        </Link>
      </p>
    </section>
  )
}
