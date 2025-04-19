import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Award, MessageSquare, FileText, Send, Github, Linkedin } from 'lucide-react';
import { userData } from '../data/userData';

const navLinks = [
  { name: 'Home', href: '#hero', icon: <Home size={18} /> },
  { name: 'Journey', href: '#dev-journey', icon: <User size={18} /> },
  { name: 'Projects', href: '#projects', icon: <Briefcase size={18} /> },
  { name: 'Skills', href: '#skills', icon: <Award size={18} /> },
  { name: 'Ask MetaMe', href: '#chat', icon: <MessageSquare size={18} /> },
  { name: 'Resume', href: '#resume', icon: <FileText size={18} /> },
  { name: 'Contact', href: '#contact', icon: <Send size={18} /> },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#hero" 
          className="text-2xl font-bold flex items-center"
        >
          <span className="gradient-text">Meta</span>
          <span className="text-white">Me</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href="#"
              className="text-gray-300 hover:text-white flex items-center gap-1 transition-colors"
              onClick={e => {
                e.preventDefault();
                const section = document.getElementById(link.href.replace('#', ''));
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))} 
        </div>

        {/* Social Icons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {userData.socialLinks.github && (
            <a
              href={userData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          )}
          {userData.socialLinks.linkedin && (
            <a
              href={userData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-background/95 backdrop-blur-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                className="text-gray-300 hover:text-white py-2 flex items-center gap-2"
                onClick={e => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  const section = document.getElementById(link.href.replace('#', ''));
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {link.icon}
                {link.name}
              </a>
            ))}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-700">
              {userData.socialLinks.github && (
                <a
                  href={userData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
              )}
              {userData.socialLinks.linkedin && (
                <a
                  href={userData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;