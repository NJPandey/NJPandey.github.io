import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchManifest, formatDate } from '../lib/blog.js'

export default function Blog() {
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Blog - Anjani Kumar Pandey'
    let active = true
    fetchManifest()
      .then((data) => active && setPosts(data.posts))
      .catch((err) => active && setError(err))
    return () => {
      active = false
    }
  }, [])

  return (
    <section className="section blog-page container" aria-labelledby="blog-heading">
      <p className="eyebrow">Blog</p>
      <h2 id="blog-heading">Notes and refreshers</h2>
      <p className="blog-intro">
        Short technical notes on things I'm working with or learning - mostly backend
        systems, integration platforms, and AI-assisted development.
      </p>
      {error && (
        <p role="alert" className="muted">
          The post list could not be loaded. Try refreshing the page.
        </p>
      )}
      {!error && !posts && <p className="muted">Loading…</p>}
      {posts && posts.length === 0 && <p className="muted">No posts yet.</p>}
      {posts && posts.length > 0 && (
        <ol className="post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="post-card">
                <p className="post-meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true"> · </span>
                  {post.readingMinutes} min read
                </p>
                <h3>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="post-excerpt">{post.excerpt}</p>
                {post.tags.length > 0 && (
                  <ul className="tag-list" aria-label="Tags">
                    {post.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
