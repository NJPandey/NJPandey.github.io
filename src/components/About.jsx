export default function About({ paragraphs, skills }) {
  return (
    <section className="section container" id="about" aria-labelledby="about-heading">
      <p className="eyebrow">About</p>
      <h2 id="about-heading">A bit more detail</h2>
      <div className="about-copy">
        {paragraphs.map((text) => (
          <p key={text.slice(0, 32)}>{text}</p>
        ))}
      </div>
      <div className="stack">
        <h3 className="stack-heading">Day-to-day stack</h3>
        <p className="stack-list">{skills.join(' · ')}</p>
      </div>
    </section>
  )
}
