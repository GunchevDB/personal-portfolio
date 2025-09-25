import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  isVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({ isVisible }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.set('.header-content', { y: -100, opacity: 0 });
      
      gsap.to(
        '.header-content',
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.header-content',
            start: 'top 90%',
            end: 'top 10%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="header-content flex items-center justify-between">
          <div className="text-xl font-bold text-white tracking-tight">
            DG
          </div>

          <div className="flex space-x-6">
            <a
              href="mailto:gunchev.db@gmail.com"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://github.com/GunchevDB"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/dimitar-gunchev-6aa139223/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;