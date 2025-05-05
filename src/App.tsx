import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PortfolioSection from './components/PortfolioSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

// Hooks
import usePageTransition from './hooks/usePageTransition';
import useSmoothScroll from './hooks/useSmoothScroll';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  usePageTransition();
  useSmoothScroll();
  
  useEffect(() => {
    // Update page title
    document.title = 'Youssef Ayguel | Sports Visual Editor';
    
    // Add specific styles for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    }
    
    // Initialize scroll trigger refresh on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="overflow-hidden">
      {/* Page transition overlay */}
      <motion.div
        className="page-transition fixed inset-0 bg-neutral-900 z-50"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1, ease: [0.645, 0.045, 0.355, 1.000] }}
      ></motion.div>
      
      {/* Scroll progress bar */}
      <div className="scroll-progress fixed top-0 left-0 h-1 bg-secondary-500 z-50"></div>
      
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Main content */}
      <Navbar />
      
      <main>
        <HeroSection />
        <PortfolioSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;