import { useEffect } from 'react'
import About from '../components/About.jsx'

export default function AboutPage({ content }) {
  useEffect(() => {
    document.title = 'About - Anjani Kumar Pandey'
  }, [])

  return (
    <div className="page">
      <About paragraphs={content.about} skills={content.skills} />
    </div>
  )
}
