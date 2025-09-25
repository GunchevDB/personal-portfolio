import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThreeBackground from './components/ThreeBackground';
import LaunchScreen from './components/LaunchScreen';
import Header from './components/Header';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import { Project } from './components/ProjectCard';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showLaunchScreen, setShowLaunchScreen] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    gsap.set('.projects-section', { y: 50, opacity: 0, visibility: 'visible' });
    gsap.set('.footer-section', { y: 50, opacity: 0, visibility: 'visible' });
    
    gsap.to('.projects-section', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-section',
          start: 'top 85%',
          end: 'top 15%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true
        }
      });
      
      gsap.to('.footer-section', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer-section',
          start: 'top 85%',
          end: 'top 15%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true
        }
      });
    
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowLaunchScreen(false);
      } else {
        setShowLaunchScreen(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollStart = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen text-white">
      <ThreeBackground />
      <CustomCursor />
      <LaunchScreen 
        isVisible={showLaunchScreen} 
        onScrollStart={handleScrollStart}
      />
      <Header isVisible={!showLaunchScreen} />
      
      <main>
        {}
        <div className="h-screen" />
        <div className="relative z-10 projects-section">
          <Projects onProjectSelect={setSelectedProject} />
        </div>
        <div className="footer-section">
          <Footer />
        </div>
      </main>
      
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;