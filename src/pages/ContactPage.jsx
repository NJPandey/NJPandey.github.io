import { useEffect } from 'react'
import Contact from '../components/Contact.jsx'

export default function ContactPage({ content }) {
  useEffect(() => {
    document.title = 'Contact - Anjani Kumar Pandey'
  }, [])

  return (
    <div className="page">
      <Contact email={content.email} github={content.github} linkedin={content.linkedin} />
    </div>
  )
}
