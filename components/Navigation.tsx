import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect and detect dark sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Check if we're on the About page or Project Detail page (both have dark hero sections)
      if (location.pathname === '/about' || location.pathname.startsWith('/project/')) {
        // Hero section is approximately 60-70vh
        const heroHeight = window.innerHeight * 0.65;
        setIsDarkSection(scrollY < heroHeight);
      } else {
        setIsDarkSection(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { path: '/', label: t('nav.work') },
    { path: '/about', label: t('nav.about') },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-brutal-white/95 backdrop-blur-md border-b-brutal border-brutal-black py-3'
          : isDarkSection
            ? 'bg-transparent py-6'
            : 'bg-transparent py-6'
      }`}>
        <div className="max-w-[1800px] mx-auto px-5 sm:px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="relative z-50 group"
            >
              <span className={`text-lg md:text-xl font-bold tracking-tighter group-hover:text-brutal-accent transition-colors duration-300 ${
                isDarkSection && !isScrolled ? 'text-white drop-shadow-md' : 'text-brutal-black'
              }`}>
                HUGO
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brutal-accent group-hover:w-full transition-all duration-300"></div>
            </Link>

            {/* Desktop Navigation - Contact button removed */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${
                    isActive(link.path)
                      ? isDarkSection && !isScrolled
                        ? 'text-white font-bold drop-shadow-md'
                        : 'text-brutal-black font-bold'
                      : isDarkSection && !isScrolled
                        ? 'text-white/80 hover:text-white drop-shadow-sm'
                        : 'text-brutal-gray hover:text-brutal-black'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-brutal-accent"></div>
                  )}
                </Link>
              ))}

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={`flex items-center gap-2 border-brutal px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 group ${
                  isDarkSection && !isScrolled
                    ? 'border-white text-white hover:bg-white hover:text-brutal-black'
                    : 'border-brutal-black hover:bg-brutal-black hover:text-brutal-white'
                }`}
              >
                <Globe className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                {language === 'zh' ? 'EN' : '中文'}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 md:hidden flex flex-col items-center justify-center w-11 h-11 sm:w-12 sm:h-12 gap-1.5 group"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-brutal-black" />
              ) : (
                <Menu className={`w-6 h-6 group-hover:rotate-180 transition-transform duration-300 ${
                  isDarkSection && !isScrolled ? 'text-white drop-shadow-md' : 'text-brutal-black'
                }`} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-brutal-white transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen px-8">
          {/* Mobile Nav Links */}
          <div className="space-y-8 text-center">
            {navLinks.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-brutal-accent'
                    : 'text-brutal-black hover:text-brutal-accent'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${idx * 100 + 200}ms` : '0ms'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Language Toggle */}
          <div className="mt-16 flex flex-col items-center gap-6">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-3 border-brutal border-brutal-black px-6 py-3 font-mono text-sm uppercase tracking-wider hover:bg-brutal-black hover:text-brutal-white transition-all duration-300"
            >
              <Globe className="w-4 h-4" />
              {language === 'zh' ? 'Switch to English' : '切换到中文'}
            </button>
          </div>
        </div>

        {/* Mobile Menu Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>

    </>
  );
};

export default Navigation;