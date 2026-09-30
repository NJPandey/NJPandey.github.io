import { useEffect } from 'react'
import Work from '../components/Work.jsx'

export default function WorkPage({ content }) {
  useEffect(() => {
    document.title = 'Work - Anjani Kumar Pandey'
  }, [])

  return (
    <div className="page">
      <Work items={content.work} />
    </div>
  )
}
