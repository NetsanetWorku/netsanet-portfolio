import Navbar from './components/Navbar'
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

function App() {
  return (
    <div className="bg-white">
      <Navbar />
      
      {/* Hero/Home Section */}
      <Home />

      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 animated-name glow">About Me</h2>
          <p className="text-lg text-gray-700 text-center leading-relaxed">
            I'm a passionate full-stack developer with a love for creating elegant, 
            user-friendly applications. With experience in modern web technologies including 
            HTML, CSS, JavaScript, React, TypeScript, and PHP, I enjoy solving complex problems 
            and bringing ideas to life through code.
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