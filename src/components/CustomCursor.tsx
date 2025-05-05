import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorTrail = cursorTrailRef.current;
    
    if (!cursor || !cursorTrail) return;
    
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      
      gsap.to(cursorTrail, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    };
    
    // Add hover effect for clickable elements
    const addHoverClass = () => {
      cursor?.classList.add('cursor-hover');
      cursorTrail?.classList.add('cursor-trail-hover');
    };
    
    const removeHoverClass = () => {
      cursor?.classList.remove('cursor-hover');
      cursorTrail?.classList.remove('cursor-trail-hover');
    };
    
    document.addEventListener('mousemove', onMouseMove);
    
    const clickableElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    clickableElements.forEach(element => {
      element.addEventListener('mouseenter', addHoverClass);
      element.addEventListener('mouseleave', removeHoverClass);
    });
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      
      clickableElements.forEach(element => {
        element.removeEventListener('mouseenter', addHoverClass);
        element.removeEventListener('mouseleave', removeHoverClass);
      });
    };
  }, []);
  
  // Don't show custom cursor on mobile/touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }
  
  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed w-5 h-5 rounded-full bg-secondary-500 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        ref={cursorTrailRef}
        className="fixed w-10 h-10 rounded-full border border-secondary-500 pointer-events-none z-40 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
};

export default CustomCursor;