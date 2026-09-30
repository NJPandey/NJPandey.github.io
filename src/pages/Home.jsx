import Hero from '../components/Hero.jsx'
import Work from '../components/Work.jsx'
import Projects from '../components/Projects.jsx'
import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'

export default function Home({ content }) {
  return (
    <>
      <Hero content={content} />
      <Work items={content.work} />
      <Projects projects={content.projects} />
      <About paragraphs={content.about} skills={content.skills} />
      <Contact email={content.email} github={content.github} linkedin={content.linkedin} />
    </>
  )
}
