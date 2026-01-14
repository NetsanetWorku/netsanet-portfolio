import Header from './components/Header'
import Home from './components/Home'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Gallery from './components/Gallery'
import { skills } from './data/skills'
import { experiences, education } from './data/experience'
import { certifications } from './data/certifications'
import { galleryImages } from './data/gallery'
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      
      {/* Hero/Home Section */}
      <Home />

      {/* About Section - Simple placeholder for now */}
      <section id="about" className={styles.section}>
        <div className={styles.container}>
          <h2>About Me</h2>
          <p>
            I'm a passionate full-stack developer with a love for creating elegant, 
            user-friendly applications. With experience in modern web technologies, 
            I enjoy solving complex problems and bringing ideas to life through code.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <Projects />

      {/* Skills Section */}
      <Skills skills={skills} />

      {/* Experience Section */}
      <Experience experiences={experiences} education={education} certifications={certifications} />

      {/* Gallery Section */}
      <Gallery images={galleryImages} />

      {/* Contact Section */}
      <Contact />
    </div>
  )
}

export default App