import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { marked } from 'marked'
import { fetchManifest, formatDate } from '../lib/blog.js'

marked.use({ gfm: true })

function stripFrontmatter(raw) {
  return raw.replace(/^---\n[\s\S]*?\n---\n/, '')
}

export default function Post() {
  const { slug } = useParams()
  const [state, setState] = useState({ status: 'loading' })

  useEffect(() => {
    let active = true
    Promise.all([
      fetch(`/blog/${slug}.md`).then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      }),
      fetchManifest()
    ])
      .then(([markdown, manifest]) => {
        if (!active) return
        const meta = manifest.posts.find((p) => p.slug === slug) || null
        if (meta) document.title = `${meta.title} - Anjani Kumar Pandey`
        setState({ status: 'ok', html: marked.parse(stripFrontmatter(markdown)), meta })
      })
      .catch(() => active && setState({ status: 'error' }))
    return () => {
      active = false
    }
  }, [slug])

  if (state.status === 'error') {
    return (
      <section className="section container">
        <p role="alert">This post could not be found.</p>
        <p>
          <Link className="text-link" to="/blog">
            ← Back to all posts
          </Link>
        </p>
      </section>
    )
  }

  if (state.status === 'loading') {
    return (
      <section className="section container">
        <p className="muted">Loading…</p>
      </section>
    )
  }

  const { html, meta } = state

  return (
    <article className="section container post-page">
      <p className="post-back">
        <Link className="text-link" to="/blog">
          ← All posts
        </Link>
      </p>
      {meta && (
        <header className="post-header">
          <p className="post-meta">
            <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            <span aria-hidden="true"> · </span>
            {meta.readingMinutes} min read
          </p>
          <h1>{meta.title}</h1>
          {meta.tags.length > 0 && (
            <ul className="tag-list" aria-label="Tags">
              {meta.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </header>
      )}
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}
