import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Send,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  MapPin,
  Clock,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { FormValues } from '../types';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'envoi' | 'succès' | 'erreur'>('idle');

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const form = formRef.current;
    const social = socialRef.current;

    if (!section || !heading || !form || !social) return;

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

    gsap.fromTo(
      form,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: form,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      social,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: social,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('envoi');

    setTimeout(() => {
      setFormStatus('succès');
      setFormValues({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };

  const socialLinks = [
    { name: 'Instagram', icon: <Instagram size={20} />, url: 'https://instagram.com/y2s_94140' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-neutral-900/80">
      <div className="container mx-auto px-4">
        <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Contact
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-neutral-800/50 backdrop-blur-sm p-8 rounded-lg border border-neutral-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white"
                    placeholder="jean@example.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-white mb-2">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formValues.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white"
                  placeholder="Demande de projet"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-white mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white resize-none"
                  placeholder="Bonjour, je souhaite discuter d'un projet..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus === 'envoi'}
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white transition-all ${
                  formStatus === 'succès'
                    ? 'bg-success-500 hover:bg-success-600'
                    : formStatus === 'erreur'
                    ? 'bg-error-500 hover:bg-error-600'
                    : 'bg-secondary-500 hover:bg-secondary-600'
                }`}
              >
                {formStatus === 'envoi' ? (
                  <>Envoi<span className="animate-pulse">...</span></>
                ) : formStatus === 'succès' ? (
                  <>Message envoyé !</>
                ) : formStatus === 'erreur' ? (
                  <>Erreur d'envoi</>
                ) : (
                  <>Envoyer <Send size={16} /></>
                )}
              </button>
            </form>
          </div>

          <div ref={socialRef} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-700">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-500/10 rounded-full">
                    <MapPin size={20} className="text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Localisation</h3>
                    <p className="text-neutral-400">Val-de-Marne, Paris</p>
                    <p className="text-neutral-400">France</p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-700">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-500/10 rounded-full">
                    <Clock size={20} className="text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Horaires</h3>
                    <p className="text-neutral-400">Lun - Ven : 15h - 22h</p>
                    <p className="text-neutral-400">Week-end : sur rendez-vous</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 bg-neutral-800/50 p-6 rounded-lg border border-neutral-700">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-500/10 rounded-full">
                    <MessageSquare size={20} className="text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Temps de réponse</h3>
                    <p className="text-neutral-400">Je réponds en général sous 24 à 48 heures.</p>
                    <p className="text-neutral-400">Pour les urgences, précisez-le dans le message.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-800/50 p-8 rounded-lg border border-neutral-700">
              <h3 className="text-xl text-white font-semibold mb-6">Me suivre</h3>

              <div className="flex flex-wrap gap-4 mb-8">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-700 hover:bg-primary-500 text-white"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>

              <div className="space-y-4">
  <h4 className="text-white font-medium">Suivre sur Instagram</h4>
  <div className="grid grid-cols-3 gap-2">
    {[
      '/insta1.jpg',
      '/insta2.jpg',
      '/insta3.jpg',    
      '/insta4.jpg',    
      '/insta5.jpg',    
      '/insta6.jpg',
    ].map((src, index) => (
      <div key={index} className="aspect-square overflow-hidden rounded-md bg-neutral-700">
        <img
          src={src}
          alt={`Publication Instagram ${index + 1}`}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
    ))}
  </div>

  <a
    href="https://instagram.com/y2s_941"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-4 inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
  >
    Voir sur Instagram <ArrowRight size={16} />
  </a>
</div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
