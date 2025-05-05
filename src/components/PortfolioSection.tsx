import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import { Project } from '../types';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;

    if (!section || !heading) return;

    gsap.fromTo(
      heading,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: heading,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter]);

  const filters = [
    { id: 'all', label: 'Tout' },
    { id: 'photo', label: 'Photos' },
    { id: 'video', label: 'Vidéos' },
    { id: 'graphic', label: 'Graphisme' },
  ];

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 bg-neutral-900">
      <div className="container mx-auto px-4">
        <motion.h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
        >
          Mon Portfolio
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeFilter === filter.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-800 text-white/70 hover:bg-neutral-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      variants={itemVariants}
      className="group relative overflow-hidden rounded-lg shadow-lg h-[300px] md:h-[350px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 w-full h-full bg-neutral-900/30 z-10"></div>
      <img
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
        <div
          className={`transition-all duration-500 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-secondary-500 uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs px-2 py-0.5 bg-white/10 rounded text-white/70">
              {project.year}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
          <p className="text-sm text-white/70 mb-3">Client: {project.client}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-0.5 bg-primary-500/20 rounded text-primary-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <button className="flex items-center gap-2 text-white bg-secondary-500 hover:bg-secondary-600 transition-colors px-4 py-2 rounded-full text-sm">
            Voir le Projet <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioSection;