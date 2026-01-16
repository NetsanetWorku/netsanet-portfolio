import React, { useState, useEffect } from 'react';

interface HeroProps {
  className?: string;
}

const Home: React.FC<HeroProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
      className={`pt-32 pb-20 px-4 md:px-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center ${
        isVisible ? 'animate-fadeIn' : 'opacity-0'
      } ${className || ''}`}
      role="main"
      aria-labelledby="hero-title"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Container */}
          <div className={`flex justify-center ${isVisible ? 'animate-slideIn' : ''}`}>
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-3xl opacity-40"></div>
              <img
                src="./images/netsa.jpg"
                alt="Professional headshot of Netsanet, a full-stack developer"
                className="relative w-full h-full object-cover rounded-full shadow-2xl border-4 border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 animate-float"
                loading="eager"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEyMCIgcj0iNDUiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTc1IDI0MEM3NSAyMDIuNzIgMTA1LjcyIDE3MiAxNDMgMTcySDE1N0MxOTQuMjggMTcyIDIyNSAyMDIuNzIgMjI1IDI0MFYzMDBINzVWMjQwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4=';
                }}
              />
            </div>
          </div>

          {/* Text Content */}
          <div className={`text-center md:text-left ${isVisible ? 'animate-slideInRight' : ''}`}>
            <div className="mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-blue-400 mb-2 animate-wave">
                Hello, I'm
              </h2>
              <h1 
                id="hero-title"
                className="text-4xl md:text-6xl font-bold mb-4 animated-name glow"
              >
                Netsanet Worku
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-300 mb-6">
                Computer Science Student & Web Developer
              </h2>
            </div>

            <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
              Third-year Computer Science student at Madda Walabu University, passionate about 
              web development and creating modern, responsive applications. I combine academic 
              knowledge with hands-on experience in HTML, CSS, JavaScript, React, and PHP to build 
              user-friendly digital solutions.
            </p>

            {/* Skills Preview */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-gray-400 mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS', 'SCSS', 'PHP'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 rounded-full border border-blue-500/30 hover:border-blue-500 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={handleScrollToProjects}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 hover:shadow-lg"
              >
                View My Work
              </button>
              
              <button 
                onClick={handleScrollToContact}
                className="px-8 py-3 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-400/10 transition-all transform hover:scale-105"
              >
                Get In Touch
              </button>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex gap-4 justify-center md:justify-start">
              <a
                href="https://tiktok.com/@netsanet.worku"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-500 transition-all transform hover:scale-110"
                title="TikTok"
              >
                📱
              </a>
              <a
                href="https://t.me/Abi_yam21"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-500 transition-all transform hover:scale-110"
                title="Telegram"
              >
                ✈️
              </a>
              <a
                href="https://github.com/NetsanetWorku"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-500 transition-all transform hover:scale-110"
                title="GitHub"
              >
                💻
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center">
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;