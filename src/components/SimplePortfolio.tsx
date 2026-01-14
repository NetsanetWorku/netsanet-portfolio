import React, { useState } from 'react';
import './SimplePortfolio.css';

// Simple data structures
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
}

interface Skill {
  name: string;
  category: string;
}

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
}

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const SimplePortfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Sample data - replace with your actual data
  const projects: Project[] = [
    {
      id: '1',
      title: 'E-commerce Website',
      description: 'A full-stack e-commerce platform with user authentication and payment processing.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      liveUrl: 'https://example.com',
      sourceUrl: 'https://github.com/user/project'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A responsive task management application with real-time updates.',
      technologies: ['TypeScript', 'Express', 'PostgreSQL'],
      liveUrl: 'https://example.com',
      sourceUrl: 'https://github.com/user/project2'
    }
  ];

  const skills: Skill[] = [
    { name: 'JavaScript', category: 'Languages' },
    { name: 'TypeScript', category: 'Languages' },
    { name: 'React', category: 'Frameworks' },
    { name: 'Node.js', category: 'Frameworks' },
    { name: 'Git', category: 'Tools' },
    { name: 'Docker', category: 'Tools' }
  ];

  const experience: Experience[] = [
    {
      company: 'Tech Company',
      position: 'Frontend Developer',
      period: '2022 - Present',
      description: 'Developed responsive web applications using React and TypeScript.'
    },
    {
      company: 'Startup Inc',
      position: 'Junior Developer',
      period: '2021 - 2022',
      description: 'Built REST APIs and worked on database optimization.'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (contactForm.name && contactForm.email && contactForm.message) {
      console.log('Form submitted:', contactForm);
      setFormSubmitted(true);
      setContactForm({ name: '', email: '', message: '' });
    }
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <h1 className="logo">Your Name</h1>
          <ul className="nav-menu">
            <li><button onClick={() => setActiveSection('home')} className={activeSection === 'home' ? 'active' : ''}>Home</button></li>
            <li><button onClick={() => setActiveSection('projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</button></li>
            <li><button onClick={() => setActiveSection('skills')} className={activeSection === 'skills' ? 'active' : ''}>Skills</button></li>
            <li><button onClick={() => setActiveSection('experience')} className={activeSection === 'experience' ? 'active' : ''}>Experience</button></li>
            <li><button onClick={() => setActiveSection('contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</button></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main">
        {/* Home Section */}
        {activeSection === 'home' && (
          <section className="section hero">
            <div className="container">
              <h1>Hi, I'm Your Name</h1>
              <h2>Full Stack Developer</h2>
              <p>I create modern web applications with clean code and great user experiences.</p>
              <button onClick={() => setActiveSection('projects')} className="cta-button">
                View My Work
              </button>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <section className="section">
            <div className="container">
              <h2>Projects</h2>
              <div className="projects-grid">
                {projects.map(project => (
                  <div key={project.id} className="project-card">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tech-tags">
                      {project.technologies.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          Live Demo
                        </a>
                      )}
                      {project.sourceUrl && (
                        <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <section className="section">
            <div className="container">
              <h2>Skills</h2>
              <div className="skills-grid">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category} className="skill-category">
                    <h3>{category}</h3>
                    <div className="skill-list">
                      {categorySkills.map(skill => (
                        <span key={skill.name} className="skill-item">{skill.name}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experience Section */}
        {activeSection === 'experience' && (
          <section className="section">
            <div className="container">
              <h2>Experience</h2>
              <div className="experience-list">
                {experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <h3>{exp.position}</h3>
                    <h4>{exp.company}</h4>
                    <span className="period">{exp.period}</span>
                    <p>{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <section className="section">
            <div className="container">
              <h2>Contact</h2>
              {formSubmitted ? (
                <div className="success-message">
                  <h3>Thank you for your message!</h3>
                  <p>I'll get back to you soon.</p>
                  <button onClick={() => setFormSubmitted(false)}>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      required
                    />
                  </div>
                  <button type="submit" className="submit-button">Send Message</button>
                </form>
              )}
              
              <div className="contact-info">
                <h3>Get in Touch</h3>
                <p>Email: your.email@example.com</p>
                <p>LinkedIn: linkedin.com/in/yourprofile</p>
                <p>GitHub: github.com/yourusername</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default SimplePortfolio;