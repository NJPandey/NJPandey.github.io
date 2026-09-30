export default function Projects({ projects }) {
  return (
    <section className="section container" id="projects" aria-labelledby="projects-heading">
      <p className="eyebrow">Personal projects</p>
      <h2 id="projects-heading">Things I've built</h2>
      <ol className="project-list">
        {projects.map((project, index) => (
          <li key={project.title}>
            <article className="project">
              <span className="project-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="project-body">
                <h3>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.title}
                    <span className="external-mark" aria-hidden="true"> ↗</span>
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
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
