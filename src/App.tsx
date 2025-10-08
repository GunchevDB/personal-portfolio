import { useState, useEffect } from 'react';
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
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showLaunchScreen, setShowLaunchScreen] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    gsap.set('.projects-section', { y: 50, opacity: 0, visibility: 'visible' });
    gsap.set('.footer-section', { y: 50, opacity: 0, visibility: 'visible' });
    
    ScrollTrigger.batch('.projects-section, .footer-section', {
      onEnter: (elements) => {
        gsap.to(elements, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2
        });
      },
      start: 'top 85%',
    });
    
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300); 
    
    return () => {
      clearTimeout(refreshTimeout);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            const shouldShow = window.scrollY <= window.innerHeight * 0.5;
            setShowLaunchScreen(shouldShow);
          }, 16); 
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
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
      <Analytics />
      <SpeedInsights/>
    </div>
  );
}

export default App;