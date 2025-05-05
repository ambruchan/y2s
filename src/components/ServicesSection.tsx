import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '../data/services';
import { Camera, Video, Layers, TrendingUp, ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'camera':
      return <Camera size={24} className="text-secondary-500" />;
    case 'video':
      return <Video size={24} className="text-secondary-500" />;
    case 'layers':
      return <Layers size={24} className="text-secondary-500" />;
    case 'trending-up':
      return <TrendingUp size={24} className="text-secondary-500" />;
    default:
      return <Camera size={24} className="text-secondary-500" />;
  }
};

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

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

    const cardElements = cards.querySelectorAll('.service-card');
    
    gsap.fromTo(
      cardElements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: cards,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-neutral-900">
      <div className="container mx-auto px-4">
        <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Mes services
        </h2>
        
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service) => (
            <ServiceCard 
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              features={service.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, features }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      setIsFlipped(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      setIsFlipped(false);
    }
  };
  
  const handleClick = () => {
    if (window.innerWidth < 768) {
      setIsFlipped(!isFlipped);
    }
  };
  
  return (
    <div 
      ref={cardRef}
      className="service-card perspective-1000 h-[440px] md:h-[460px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Face avant */}
        <div className="absolute inset-0 backface-hidden transform transition-transform duration-500 rounded-lg overflow-hidden h-full w-full flex flex-col items-center justify-center p-8 border border-neutral-800 bg-neutral-800/50 backdrop-blur-sm hover:border-primary-500">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-500/10 mb-6">
            {getIcon(icon)}
          </div>
          
          <h3 className="text-xl font-bold text-white mb-4 text-center">{title}</h3>
          
          <p className="text-neutral-300 text-center mb-6">{description}</p>
          
          <button className="mt-auto flex items-center gap-2 text-secondary-500 hover:text-secondary-400 transition-colors text-sm">
            <span>En savoir plus</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        {/* Face arrière */}
        <div className="absolute inset-0 backface-hidden transform transition-transform duration-500 rounded-lg h-full w-full rotate-y-180 flex flex-col p-8 border border-primary-500 bg-primary-500/10 backdrop-blur-sm overflow-y-auto">
          <h3 className="text-xl font-bold text-white mb-6 text-center">{title}</h3>
          
          <ul className="flex-1 space-y-3 min-h-0 overflow-hidden">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check size={18} className="text-secondary-500 mt-0.5 flex-shrink-0" />
                <span className="text-neutral-300">{feature}</span>
              </li>
            ))}
          </ul>
          
          <button className="mt-auto w-fit mx-auto px-4 py-1.5 text-sm bg-secondary-500 hover:bg-secondary-600 text-white rounded-full transition-all">
            Demander ce service
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
