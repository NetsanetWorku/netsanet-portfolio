import React, { useState, useEffect } from 'react';
import styles from './Home.module.scss';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section 
      id="hero" 
      className={`${styles.hero} ${isVisible ? styles.visible : ''} ${className || ''}`}
      role="main"
      aria-labelledby="hero-title"
    >
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Professional headshot */}
          <div className={styles.imageContainer}>
            <img
              src="./images/netsa.jpg"
              alt="Professional headshot of Netsanet, a full-stack developer"
              className={styles.profileImage}
              loading="eager"
              width="300"
              height="300"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEyMCIgcj0iNDUiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTc1IDI0MEM3NSAyMDIuNzIgMTA1LjcyIDE3MiAxNDMgMTcySDE1N0MxOTQuMjggMTcyIDIyNSAyMDIuNzIgMjI1IDI0MFYzMDBINzVWMjQwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4=';
                target.alt = 'Profile placeholder image - Netsanet, full-stack developer';
              }}
            />
          </div>

          {/* Introduction content */}
          <div className={styles.textContent}>
            <header>
              <h1 id="hero-title" className={styles.title}>
                <span className={styles.greeting} aria-label="Greeting">Hello, I'm</span>
                <span className={styles.name} aria-label="Name">Netsanet Worku</span>
              </h1>
              
              <h2 className={styles.subtitle}>
                Computer Science Student & Web Developer
              </h2>
            </header>
            
            <p className={styles.description}>
              Third-year Computer Science student at Madda Walabu University, passionate about 
              web development and creating modern, responsive applications. I combine academic 
              knowledge with hands-on experience in HTML, CSS, JavaScript, and React to build 
              user-friendly digital solutions.
            </p>
            
            <div className={styles.actions} role="group" aria-label="Call to action buttons">
              <button 
                className={styles.ctaButton}
                onClick={handleScrollToProjects}
                aria-label="View my projects section"
                type="button"
              >
                View My Work
              </button>
              
              <button 
                className={styles.secondaryButton}
                onClick={handleScrollToContact}
                aria-label="Navigate to contact section"
                type="button"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;