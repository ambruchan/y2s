import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const tagline = taglineRef.current;

    if (!section || !heading || !subheading || !tagline) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      heading,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.5 }
    )
      .fromTo(
        subheading,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.5'
      )
      .fromTo(
        tagline,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.3'
      );

    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      backgroundPosition: '50% 100%',
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const stats = [
    { value: '4+', label: 'Années d\'Expérience' },
    { value: '50+', label: 'Projets Réalisés' },
    { value: '15+', label: 'Clients Satisfaits' },
  ];

  return (
    <motion.section
      id="home"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundColor: '#101010' }}
    >
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
          poster="https://images.pexels.com/photos/163444/sport-treadmill-tor-route-163444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        >
          <source src="https://player.vimeo.com/external/403892943.sd.mp4?s=ed93020ae1bac8b06817ae4c3489944d5e877642&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          Votre navigateur ne prend pas en charge la lecture vidéo.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <motion.h1
          ref={headingRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none mt-16"
        >
          Youssef Ayguel
        </motion.h1>
        
        <motion.h2
          ref={subheadingRef}
          className="text-xl md:text-3xl text-white mt-4 opacity-90"
        >
          Éditeur Visuel Sportif
        </motion.h2>
        
        <motion.p
          ref={taglineRef}
          className="text-lg md:text-xl text-white/70 max-w-xl mt-6"
        >
          Transformer l'intensité en images
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 lg:mt-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-secondary-500">{stat.value}</p>
              <p className="text-sm md:text-base text-white/70 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <a 
            href="#portfolio" 
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center text-white/70 hover:text-white transition-colors"
          >
            <span className="text-sm mb-2">Découvrir Mon Travail</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={20} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;