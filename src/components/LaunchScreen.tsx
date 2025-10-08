import React, { useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';

interface LaunchScreenProps {
  isVisible: boolean;
  onScrollStart: () => void;
}

const LaunchScreen: React.FC<LaunchScreenProps> = ({ isVisible, onScrollStart }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle1Ref = useRef<HTMLParagraphElement>(null);
  const subtitle2Ref = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' })
      .fromTo(subtitle1Ref.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .fromTo(subtitle2Ref.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .fromTo(linksRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo(scrollIndicatorRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.2');
  }, [isVisible]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const maxScroll = window.innerHeight * 0.5;
          const progress = Math.min(window.scrollY / maxScroll, 1);
          const scale = Math.max(1 - progress, 0.2);
          el.style.setProperty('--launch-scale', String(scale));
          el.style.opacity = String(scale);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
        <div
          ref={contentRef}
          className="text-center select-none"
          style={{
            transform: 'scale(var(--launch-scale, 1))',
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
            pointerEvents: 'none',
          }}
        >
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold mb-4 text-white leading-tight tracking-tight"
            style={{ fontFamily: "'Termina Test', sans-serif" }}
          >
            Dimitar Gunchev
          </h1>

          <p ref={subtitle1Ref} className="text-2xl md:text-3xl text-gray-400 font-light tracking-wide">
            Creative Developer
          </p>
          <p ref={subtitle2Ref} className="text-2xl md:text-3xl text-gray-400 mb-12 font-light tracking-wide">
            UX/UI Designer
          </p>

          <div
            ref={linksRef}
            className="flex flex-col items-center mb-16 space-y-4"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="flex justify-center space-x-8">
              <a
                href="mailto:gunchev.db@gmail.com"
                className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110"
              >
                <Mail size={24} />
              </a>
              <a
                href="https://github.com/GunchevDB"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/dimitar-gunchev-6aa139223/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
            </div>

            <a
              href="/Dimitar-Gunchev-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xl md:text-xl text-gray-300 hover:text-white decoration-white/20 hover:decoration-white transition-colors hover:scale-110"
            >
              Resume
            </a>
          </div>

        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-40"
        style={{ pointerEvents: 'auto' }}
        onClick={onScrollStart}
      >
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="text-gray-400 hover:text-white transition-colors duration-300" size={32} />
        </div>
      </div>
    </>
  );
};

export default LaunchScreen;