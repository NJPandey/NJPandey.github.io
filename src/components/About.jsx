import Reveal from './Reveal.jsx'

export default function About({ paragraphs, skills }) {
  return (
    <section className="section container" id="about" aria-labelledby="about-heading">
      <Reveal>
        <p className="eyebrow">About</p>
        <h2 id="about-heading">A bit more detail</h2>
      </Reveal>
      <Reveal className="about-copy" delay={80}>
        {paragraphs.map((text) => (
          <p key={text.slice(0, 32)}>{text}</p>
        ))}
      </Reveal>
      <Reveal className="stack" delay={140}>
        <h3 className="stack-heading">Day-to-day stack</h3>
        <p className="stack-list">{skills.join(' · ')}</p>
      </Reveal>
    </section>
  )
}
