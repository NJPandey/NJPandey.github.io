import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const doc = document.documentElement
        const max = doc.scrollHeight - doc.clientHeight
        const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0
        if (barRef.current) barRef.current.style.width = `${pct}%`
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  )
}
