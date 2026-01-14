import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle scroll effect for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest(`.${styles.header}`)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (sectionId: string) => {
    // Close mobile menu and search
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Search through page content
      const searchTerm = searchQuery.toLowerCase();
      const sections = ['about', 'projects', 'skills', 'experience', 'gallery', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const text = element.textContent?.toLowerCase() || '';
          if (text.includes(searchTerm)) {
            handleNavClick(section);
            break;
          }
        }
      }
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  const socialLinks = [
    { 
      name: 'TikTok', 
      url: 'https://tiktok.com/@netsanet.worku',
      icon: '📱'
    },
    { 
      name: 'Telegram', 
      url: 'https://t.me/Abi_yam21',
      icon: '✈️'
    }
  ];

  return (
    <header 
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${className || ''}`}
      role="banner"
    >
      <div className={styles.container}>
        {/* Logo/Brand */}
        <div className={styles.brand}>
          <button
            onClick={() => handleNavClick('hero')}
            className={styles.brandButton}
            aria-label="Go to top of page"
          >
            <img 
              src="/images/profile-photo.jpg" 
              alt="Netsanet" 
              className={styles.profilePhoto}
            />
            <span className={styles.brandText}>Netsanet-Portfolio</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className={`${styles.searchContainer} ${isSearchOpen ? styles.searchOpen : ''}`}>
          <button
            className={styles.searchToggle}
            onClick={toggleSearch}
            aria-label="Toggle search"
          >
            <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search portfolio..."
              className={styles.searchInput}
              aria-label="Search portfolio"
            />
          </form>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} role="navigation" aria-label="Main navigation">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.id} className={styles.navItem}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={styles.navLink}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links */}
        <div className={styles.socialLinks}>
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={`Visit ${social.name} profile`}
              title={social.name}
            >
              <span className={styles.socialIcon}>{social.icon}</span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle mobile menu"
        >
          <span className={styles.hamburger}>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </span>
        </button>

        {/* Mobile Navigation */}
        <nav 
          id="mobile-menu"
          className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ''}`}
          role="navigation" 
          aria-label="Mobile navigation"
          aria-hidden={!isMobileMenuOpen}
        >
          <ul className={styles.mobileNavList}>
            {navItems.map((item) => (
              <li key={item.id} className={styles.mobileNavItem}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={styles.mobileNavLink}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className={styles.mobileOverlay}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;