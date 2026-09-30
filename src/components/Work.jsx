export default function Work({ items }) {
  return (
    <section className="section container" id="work" aria-labelledby="work-heading">
      <p className="eyebrow">At Celigo</p>
      <h2 id="work-heading">What I work on</h2>
      <ol className="project-list">
        {items.map((item, index) => (
          <li key={item.title}>
            <article className="project">
              <span className="project-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="project-body">
                <h3>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.title}
                      <span className="external-mark" aria-hidden="true"> ↗</span>
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="project-description">{item.description}</p>
                <p className="project-tags">{item.tags.join(' · ')}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
