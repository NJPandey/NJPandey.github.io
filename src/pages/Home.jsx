import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import Reveal from '../components/Reveal.jsx'

const EXPLORE_CARDS = [
  {
    to: '/work',
    title: 'Work',
    text: 'What I build at Celigo - the backend services behind the integrator.io platform.'
  },
  {
    to: '/projects',
    title: 'Projects',
    text: 'Personal builds and experiments, all public on GitHub.'
  },
  {
    to: '/blog',
    title: 'Blog',
    text: 'Guides and notes for developers, with diagrams and charts.'
  },
  {
    to: '/about',
    title: 'About',
    text: 'My background, the stack I work in, and how I got here.'
  },
  {
    to: '/contact',
    title: 'Contact',
    text: 'Email, GitHub, and LinkedIn - pick whichever suits you.'
  }
]

export default function Home({ content, theme }) {
  return (
    <>
      <Hero content={content} theme={theme} />
      <section className="section container" aria-labelledby="explore-heading">
        <Reveal>
          <p className="eyebrow">Explore</p>
          <h2 id="explore-heading">What you'll find here</h2>
        </Reveal>
        <div className="explore-grid">
          {EXPLORE_CARDS.map((card, index) => (
            <Reveal key={card.to} delay={Math.min(index, 5) * 70}>
              <Link to={card.to} className="explore-card">
                <span className="explore-title">
                  {card.title}
                  <span aria-hidden="true"> →</span>
                </span>
                <span className="explore-text">{card.text}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section container" aria-labelledby="site-heading">
        <Reveal>
          <p className="eyebrow">This site</p>
          <h2 id="site-heading">About this website</h2>
        </Reveal>
        <Reveal className="about-copy" delay={80}>
          <p>
            This is a self-built corner of the web: React and Three.js on the front,
            a small Node.js server for local development, and plain JSON and Markdown
            files for all the content - so writing a new post or updating a project
            never requires touching the code. It is open source, and there are no
            trackers or cookies here.
          </p>
          <p>
            The source lives at{' '}
            <a className="text-link" href="https://github.com/NJPandey/NJPandey.github.io" target="_blank" rel="noopener noreferrer">
              github.com/NJPandey/NJPandey.github.io
            </a>
            . The network animation above is a small neural net rendered in WebGL -
            fitting, since most of what I write about these days is AI-assisted
            development.
          </p>
        </Reveal>
      </section>
    </>
  )
}
