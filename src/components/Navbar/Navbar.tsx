import React, { useState, useEffect } from 'react';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
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
      if (isMobileMenuOpen && !target.closest('.navbar-container')) {
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
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    
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
    { id: 'projects', label: 'Projects' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav 
      className={`navbar-container fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-gradient-to-b from-gray-900/90 to-transparent'
      } ${className || ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              Netsanet
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 mx-2 ${
                  isScrolled
                    ? 'text-gray-700 hover:text-blue-500 hover:bg-gray-100'
                    : 'text-white hover:text-blue-300 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  isScrolled
                    ? 'bg-gray-200 text-gray-800 placeholder-gray-500'
                    : 'bg-white/10 text-white placeholder-white/50'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="submit"
                className={`ml-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isScrolled
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Search
              </button>
            </form>
          </div>

          {/* Mobile menu button and Search icon */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleSearch}
              className={`p-2 rounded-md transition-colors ${
                isScrolled
                  ? 'text-gray-700 hover:bg-gray-200'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              🔍
            </button>
            
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-md transition-colors ${
                isScrolled
                  ? 'text-gray-700 hover:bg-gray-200'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-4 animate-slideIn">
            <form onSubmit={handleSearch} className="flex flex-col space-y-2">
              <input
                id="search-input"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-sm bg-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-slideIn">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all ${
                  isScrolled
                    ? 'text-gray-700 hover:text-blue-500 hover:bg-gray-100'
                    : 'text-white hover:text-blue-300 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
