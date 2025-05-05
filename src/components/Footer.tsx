import React from 'react';
import { ArrowUp, Camera } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-900 py-12 border-t border-neutral-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
          <a href="#home" className="flex items-center">
  <img src="/logo.png" alt="Logo" className="h-28 md:h-32 w-auto object-contain" />
</a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href="#home" className="text-neutral-400 hover:text-white transition-colors">Accueil</a>
            <a href="#portfolio" className="text-neutral-400 hover:text-white transition-colors">Portfolio</a>
            <a href="#about" className="text-neutral-400 hover:text-white transition-colors">A propos</a>
            <a href="#services" className="text-neutral-400 hover:text-white transition-colors">Services</a>
            <a href="#contact" className="text-neutral-400 hover:text-white transition-colors">Contact</a>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 hover:bg-primary-500 text-white transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
        
        <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
          <p className="text-neutral-500">
            © {currentYear} Youssef Ayguel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;