import { useEffect } from 'react'
import Projects from '../components/Projects.jsx'

export default function ProjectsPage({ content }) {
  useEffect(() => {
    document.title = 'Projects - Anjani Kumar Pandey'
  }, [])

  return (
    <div className="page">
      <Projects projects={content.projects} />
    </div>
  )
}
