import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';
import { skills } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const skillsContainer = skillsRef.current;

    if (!section || !image || !content || !skillsContainer) return;

    gsap.fromTo(
      image,
      { y: 0 },
      {
        y: -50,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      content,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: content,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      }
    );

    const skillBars = skillsContainer.querySelectorAll('.skill-bar');
    
    skillBars.forEach((bar) => {
      const progress = bar.querySelector('.progress') as HTMLElement;
      const width = progress.dataset.width;
      
      gsap.fromTo(
        progress,
        { width: '0%' },
        {
          width: width,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: skillsContainer,
            start: 'top bottom-=150',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-neutral-900/95">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">À propos</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Section image */}
          <div ref={imageRef} className="relative">
            <div className="relative h-[500px] lg:h-[600px] w-full overflow-hidden rounded-lg">
              <img
                src="https://images.pexels.com/photos/8260143/pexels-photo-8260143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Youssef Ayguel"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-500/80 to-transparent mix-blend-multiply"></div>
            </div>
            
            {/* Badge localisation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 lg:bottom-8 lg:right-8 bg-neutral-800 rounded-lg p-4 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-secondary-500" />
                <span className="text-white font-medium">Val-de-Marne, France</span>
              </div>
            </motion.div>
          </div>
          
          {/* Section texte */}
          <div ref={contentRef}>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Éditeur Visuel Sportif</h3>
            
            <div className="space-y-4 text-neutral-300 mb-8">
              <p>
                Éditeur visuel spécialisé dans le sport depuis plus de 4 ans, je capture l'émotion, l'intensité et la beauté de la compétition à travers la photo, la vidéo et le design graphique.
              </p>
              <p>
                Mon travail a été présenté lors de grands événements sportifs tels que la Ligue 1, la Ligue des Champions, Roland-Garros ou encore le Tour de France. Chaque projet est pour moi l'occasion de raconter une histoire visuelle forte.
              </p>
              <p>
                Basé dans le Val-de-Marne, je collabore avec des médias, fédérations et marques sportives à travers l'Europe pour créer un contenu captivant et authentique.
              </p>
            </div>
            
            {/* Compétences */}
            <div ref={skillsRef} className="space-y-4">
              <h4 className="text-xl font-semibold text-white mb-4">Compétences techniques</h4>
              
              {skills.map((skill, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-white">{skill.name}</span>
                    <span className="text-neutral-400">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden skill-bar">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-full rounded-full progress"
                      data-width={`${skill.proficiency}%`}
                      style={{ width: 0 }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
