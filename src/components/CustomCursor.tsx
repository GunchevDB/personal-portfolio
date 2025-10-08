import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let ticking = false;

    const updateCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!ticking) {
        requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.left = `${mouseX}px`;
            cursorRef.current.style.top = `${mouseY}px`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, [role="button"], .cursor-pointer, canvas');
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
};

export default CustomCursor;