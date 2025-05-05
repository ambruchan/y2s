import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useSmoothScroll = () => {
  useEffect(() => {
    // Handle navigation link clicks for smooth scrolling
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.hash.startsWith('#')) {
        const targetSection = document.querySelector(link.hash);
        
        if (targetSection) {
          e.preventDefault();
          
          // Add a slight delay for better user experience
          setTimeout(() => {
            window.scrollTo({
              top: (targetSection as HTMLElement).offsetTop,
              behavior: 'smooth',
            });
          }, 100);
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    
    // Add scroll progress indicator
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollProgress = (scrollTop / scrollHeight) * 100;
      
      const progressBar = document.querySelector('.scroll-progress') as HTMLElement;
      if (progressBar) {
        progressBar.style.width = `${scrollProgress}%`;
      }
    };
    
    window.addEventListener('scroll', updateScrollProgress);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);
};

export default useSmoothScroll;