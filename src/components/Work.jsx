export default function Work({ projects }) {
  return (
    <section className="section container" id="work" aria-labelledby="work-heading">
      <p className="eyebrow">Selected work</p>
      <h2 id="work-heading">What I work on</h2>
      <ol className="project-list">
        {projects.map((project, index) => (
          <li key={project.title}>
            <article className="project">
              <span className="project-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="project-body">
                <h3>
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      {project.title}
                      <span className="external-mark" aria-hidden="true"> ↗</span>
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="project-description">{project.description}</p>
                <p className="project-tags">{project.tags.join(' · ')}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
