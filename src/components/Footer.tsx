import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mainTextRef = useRef<HTMLParagraphElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const handRef = useRef<HTMLSpanElement>(null);

  const wave = () => {
    if (!handRef.current) return;
    gsap.fromTo(
      handRef.current,
      { rotate: -15 },
      {
        rotate: 15,
        duration: 0.2,
        yoyo: true,
        repeat: 5,
        transformOrigin: '70% 70%',
        ease: 'power1.inOut',
        onComplete: () => {
          gsap.to(handRef.current, { rotate: 0, duration: 0.2 });
        },
      }
    );
  };

  useEffect(() => {
    if (!footerRef.current || !textRef.current || !mainTextRef.current || !greetingRef.current) return;

    gsap.set(textRef.current, { y: 50, opacity: 0 });
    gsap.to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        onEnter: () => wave(),
      },
    });

    gsap.fromTo(
      [mainTextRef.current, greetingRef.current],
      { color: '#3A3B3D' },
      {
        color: '#FFFFFF',
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 50%',
          end: 'top 0%',
          scrub: 1,
        },
      }
    );

    let loopActive = true;
    const randomWaveLoop = () => {
      if (!loopActive) return;
      const delay = gsap.utils.random(5, 10);
      gsap.delayedCall(delay, () => {
        const rect = footerRef.current?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
          wave();
        }
        randomWaveLoop();
      });
    };
    randomWaveLoop();

    return () => {
      loopActive = false;
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative py-20 px-6 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div ref={textRef} className="mb-16 pl-[10%]">
          <p
            ref={mainTextRef}
            className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light mb-8 md:max-w-[70%] px-4 md:px-0 text-left"
          >
            I'm a front-end developer with experience at 2 early stage startups; InnerBuddies and Logichainge.
            <br />
            <br />
            With a strong eye for visual detail, I'm always pushing for 'just that little bit more'. Aiming for
            aesthetically pleasing top-quality digital experiences.
          </p>

          <p
            ref={greetingRef}
            className="text-2xl md:text-3xl font-light md:max-w-[60%] px-4 md:px-0 text-left"
          >
            Nice to meet you!{' '}
            <span
              ref={handRef}
              onMouseEnter={() => wave()}
              className="inline-block cursor-pointer pl-2 select-none text-3xl scale-150 origin-bottom"
            >
              👋
            </span>
          </p>
        </div>

        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 border border-gray-600/30">
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-6 md:gap-8 lg:justify-between">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-center">
              <a
                href="mailto:gunchev.db@gmail.com"
                className="text-gray-200 hover:text-white transition-colors duration-300 text-lg font-medium"
              >
                gunchev.db@gmail.com
              </a>
              <a
                href="tel:+359877177393"
                className="text-gray-200 hover:text-white transition-colors duration-300 text-lg font-medium"
              >
                +359 877 177393
              </a>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-center">
              <div className="text-gray-400 text-lg font-medium">📍 Plovdiv, Bulgaria</div>
              <div className="text-gray-400 text-lg">© 2025</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
