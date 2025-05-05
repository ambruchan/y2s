import React, { useState, useEffect } from 'react';
import { Menu, X, Camera, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { name: 'Accueil', href: '#home' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'A propos', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];
  
  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <header className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-neutral-900/90 backdrop-blur-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
         <a href="#home" className="flex items-center">
  <img src="/logo.png" alt="Logo" className="h-28 md:h-32 w-auto object-contain" />
</a>


          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <a 
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className="text-white hover:text-secondary-500 transition-colors relative group py-2"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-secondary-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.div>
            ))}
          </nav>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white py-2 px-4 rounded-full transition-all"
            onClick={() => handleLinkClick('#contact')}
          >
            <span>Contacter</span>
            <ArrowRight size={16} />
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-neutral-900/95 backdrop-blur-sm"
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className="text-white hover:text-secondary-500 py-2 text-lg font-medium transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.05 }}
                  className="flex items-center justify-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white py-3 px-6 rounded-full mt-4 transition-all"
                  onClick={() => handleLinkClick('#contact')}
                >
                  <span>Contacter</span>
                  <ArrowRight size={16} />
                </motion.button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;