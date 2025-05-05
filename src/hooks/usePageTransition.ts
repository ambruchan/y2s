import { useEffect } from 'react';
import gsap from 'gsap';

export const usePageTransition = () => {
  useEffect(() => {
    // Create a page transition effect when the page loads
    const tl = gsap.timeline();
    
    tl.to('.page-transition', {
      duration: 1,
      scaleY: 0,
      transformOrigin: 'top',
      ease: 'power4.inOut',
    });
    
    // Clean up animation on unmount
    return () => {
      tl.kill();
    };
  }, []);
};

export default usePageTransition;