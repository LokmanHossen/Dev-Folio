/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Code2, 
  Smartphone, 
  Database, 
  Cloud, 
  Wrench, 
  GraduationCap, 
  Award,
  Briefcase,
  Terminal,
  ChevronRight,
  Layout,
  Send,
  CheckCircle2,
  Menu,
  X,
  Apple,
  FileText
} from 'lucide-react';
import { RESUME_DATA } from './constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Section = ({ title, icon: Icon, children, id }: { title: string, icon: any, children: React.ReactNode, id?: string }) => (
  <motion.section 
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mb-24 scroll-mt-24"
  >
    <div className="flex items-center gap-3 mb-8 border-b border-zinc-800 pb-2">
      <Icon className="w-6 h-6 text-emerald-500" />
      <h2 className="text-2xl font-bold tracking-tight text-zinc-100 uppercase">{title}</h2>
    </div>
    {children}
  </motion.section>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -85% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = navLinks.map(link => link.href.replace('#', ''));
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    const formData = e.currentTarget;
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_ga7y0bm';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_f4szmo9';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'cyIKXF1NnyGHV-smz';

    if (!templateId || !publicKey) {
      console.error('EmailJS Template ID or Public Key is missing');
      setFormStatus('idle');
      return;
    }

    try {
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formData,
        publicKey
      );

      if (result.text === 'OK') {
        setFormStatus('success');
        formData.reset();
      } else {
        setFormStatus('idle');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus('idle');
    }
    
    if (formStatus === 'success') {
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-400 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full border-b border-zinc-800 bg-[#0a0a0a]/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer group"
            whileHover="hover"
          >
            <motion.div 
              className="relative"
              variants={{
                hover: { scale: 1.1, rotate: -5 }
              }}
            >
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <span className="text-black font-black text-xl">L</span>
              </div>
            </motion.div>
            
            <motion.span 
              className="text-emerald-500 font-signature font-bold text-2xl hidden sm:block leading-none"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              variants={{
                hover: { x: 5, scale: 1.02 }
              }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3, 
                ease: "easeOut",
                x: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
            >
              Lokman Hossen
            </motion.span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={cn(
                  "text-xs uppercase tracking-widest font-bold transition-colors",
                  activeSection === link.href.replace('#', '') 
                    ? "text-emerald-500" 
                    : "text-zinc-500 hover:text-emerald-500"
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-zinc-400 hover:text-emerald-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-zinc-800 bg-[#0a0a0a] overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "text-sm uppercase tracking-widest font-bold transition-colors",
                      activeSection === link.href.replace('#', '') 
                        ? "text-emerald-500" 
                        : "text-zinc-500 hover:text-emerald-500"
                    )}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Hero Section */}
        <header id="home" className="mb-32 scroll-mt-24 relative">
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -z-10 animate-glow-pulse"></div>
          <div className="absolute top-1/2 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -z-10 animate-glow-pulse" style={{ animationDelay: '2s' }}></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                AVAILABLE FOR NEW OPPORTUNITIES
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-zinc-100 mb-4 tracking-tighter">
                {RESUME_DATA.name}
              </h1>
              <p className="text-xl lg:text-2xl text-emerald-500 font-medium mb-8">
                {RESUME_DATA.role}
              </p>
              
              <div className="flex flex-wrap gap-6 mb-12">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-zinc-500" />
                  <span>{RESUME_DATA.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-zinc-500" />
                  <a href={`mailto:${RESUME_DATA.contact.email}`} className="hover:text-zinc-100 transition-colors">{RESUME_DATA.contact.email}</a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-zinc-500" />
                  <span>{RESUME_DATA.contact.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a 
                  href={RESUME_DATA.contact.cv} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                >
                  <FileText className="w-5 h-5" />
                  DOWNLOAD CV
                </a>
                <div className="flex gap-4">
                  <a href={RESUME_DATA.contact.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-emerald-500/50 hover:text-emerald-500 transition-all">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={RESUME_DATA.contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-emerald-500/50 hover:text-emerald-500 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={RESUME_DATA.contact.leetcode} target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-emerald-500/50 hover:text-emerald-500 transition-all">
                    <Terminal className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="lg:col-span-5 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div 
                className="relative group cursor-pointer"
                onClick={() => setIsImageModalOpen(true)}
              >
                {/* Animated Glow Background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 animate-glow-pulse transition duration-1000"></div>
                
                <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
                  <img 
                    src="/assets/profile.png" 
                    alt={RESUME_DATA.name}
                    className="w-full h-full object-cover grayscale brightness-[1.2] contrast-[1.1] hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Floating Smartphone Icon */}
                <motion.div 
                  className="absolute top-4 right-4 z-30"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="p-3 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl text-emerald-500 shadow-xl">
                    <Smartphone className="w-6 h-6" />
                  </div>
                </motion.div>

                {/* Floating Code Icon */}
                <motion.div 
                  className="absolute bottom-4 left-4 z-30"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="p-3 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl text-blue-500 shadow-xl">
                    <Code2 className="w-6 h-6" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* About Section */}
        <motion.section 
          id="about"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-32 scroll-mt-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left Column: Title */}
            <div className="md:col-span-4">
              <div className="relative inline-block">
                <h2 className="text-4xl font-bold text-zinc-100 mb-4">About Me</h2>
                <div className="w-16 h-1.5 bg-emerald-500 rounded-full"></div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="md:col-span-8">
              <div className="space-y-8">
                <div className="text-zinc-400 text-lg leading-relaxed space-y-6">
                  <p>
                    {RESUME_DATA.objective}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-8">
                  <div>
                    <h4 className="text-emerald-500 font-bold uppercase text-sm tracking-widest mb-3">Location</h4>
                    <p className="text-zinc-100 font-medium text-lg">Rampura, Banasree, Dhaka-1212</p>
                  </div>
                  <div>
                    <h4 className="text-emerald-500 font-bold uppercase text-sm tracking-widest mb-3">Education</h4>
                    <p className="text-zinc-100 font-medium text-lg">B.Sc in CSE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills Grid */}
        <motion.section 
          id="skills"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-32 scroll-mt-24"
        >
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <h2 className="text-4xl font-bold text-zinc-100 mb-4">Technical Expertise</h2>
              <div className="w-24 h-1.5 bg-emerald-500 rounded-full mx-auto"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {RESUME_DATA.skills.map((skillGroup, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-all duration-500 group hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                <div className="flex items-center gap-4 mb-6">
                  <skillGroup.icon className="w-8 h-8 text-emerald-500" />
                  <h3 className="text-zinc-100 font-bold uppercase text-sm tracking-widest">{skillGroup.category}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((item, i) => (
                    <span key={i} className="px-4 py-2 bg-zinc-800/50 rounded-xl text-sm text-zinc-300 border border-zinc-700/50 group-hover:border-emerald-500/30 transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section 
          id="experience"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-32 scroll-mt-24"
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Briefcase className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-4xl font-bold text-zinc-100">Work Experience</h2>
          </div>

          <div className="relative space-y-12">
            {/* Vertical Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-emerald-500/30 ml-[7px]" />

            {RESUME_DATA.experience.map((exp, idx) => (
              <div key={idx} className="relative pl-10 group">
                {/* Glowing Dot */}
                <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-black z-10 shadow-[0_0_15px_rgba(16,185,129,0.6)] transition-transform group-hover:scale-125" />
                
                <div className="bg-zinc-900/40 border border-zinc-800/50 p-8 rounded-3xl hover:border-emerald-500/30 transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-zinc-100 mb-1">{exp.role}</h3>
                      <p className="text-emerald-500 font-bold uppercase tracking-wider text-sm">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold tracking-wide border border-emerald-500/20">
                        {exp.period}
                      </span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-medium pl-2 md:pl-0">
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex gap-4 text-[15px] leading-relaxed text-zinc-400 group/item">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                        <span className="group-hover/item:text-zinc-300 transition-colors">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Published Apps */}
        <Section title="Live on Stores" icon={Smartphone}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESUME_DATA.publishedApps.map((app, idx) => (
              <div key={idx} className="flex flex-col rounded-3xl bg-zinc-900/40 border border-zinc-800/50 overflow-hidden hover:border-emerald-500/30 transition-all group">
                {/* Thumbnail Area */}
                <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2 py-1 bg-emerald-500 text-[10px] font-bold text-black rounded-md uppercase tracking-wider">
                      Live
                    </span>
                  </div>
                  <img 
                    src={app.thumbnail} 
                    alt={app.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80"></div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-emerald-400 transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-6 flex-1">
                    {app.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {app.tech.map((t, i) => (
                      <span key={i} className="px-2 py-1 bg-zinc-800/50 rounded text-[10px] font-bold text-zinc-500 uppercase tracking-widest border border-zinc-800">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Store Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {app.links.map((link, i) => (
                      <a 
                        key={i} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-emerald-500 hover:text-black rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border border-zinc-700/50 hover:border-emerald-400"
                      >
                        {link.label === 'Google Play' ? <Smartphone className="w-3 h-3" /> : <Apple className="w-3 h-3" />}
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section title="Featured Projects" icon={Layout} id="projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {RESUME_DATA.projects.map((project, idx) => (
              <div key={idx} className="flex flex-col p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 hover:bg-zinc-900/50 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl">
                    <project.icon className="w-6 h-6 text-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-zinc-600">{project.date}</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-100 mb-2">{project.name}</h3>
                <p className="text-xs text-emerald-500/70 font-mono mb-4">{project.tech}</p>
                <p className="text-sm leading-relaxed mb-8 flex-1">{project.description}</p>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-100 hover:text-emerald-500 transition-colors"
                >
                  View Source Code
                  <Github className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </Section>

        {/* Education & Certs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <Section title="Education" icon={GraduationCap}>
            <div className="space-y-8">
              {RESUME_DATA.education.map((edu, idx) => (
                <div key={idx} className="group">
                  <h3 className="text-zinc-100 font-bold mb-1 group-hover:text-emerald-500 transition-colors">{edu.institution}</h3>
                  <p className="text-sm mb-2">{edu.degree}</p>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-600">
                    <span>{edu.period}</span>
                    <span>{edu.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Certifications" icon={Award}>
            <div className="space-y-6">
              {RESUME_DATA.certifications.map((cert, idx) => (
                <a 
                  key={idx} 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/50 transition-all group"
                >
                  <Award className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-zinc-100 font-bold text-sm mb-1 group-hover:text-emerald-400 transition-colors">{cert.name}</h3>
                      <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-emerald-500 transition-colors shrink-0" />
                    </div>
                    <p className="text-xs text-zinc-500">{cert.issuer}</p>
                  </div>
                </a>
              ))}
            </div>
          </Section>
        </div>

        {/* Contact Section */}
        <Section title="Let's Connect" icon={Mail} id="contact">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div>
              <p className="text-lg leading-relaxed mb-12">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                    <Mail className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Email Me</p>
                    <a href={`mailto:${RESUME_DATA.contact.email}`} className="text-zinc-100 font-medium hover:text-emerald-500 transition-colors">
                      {RESUME_DATA.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                    <Phone className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Call Me</p>
                    <p className="text-zinc-100 font-medium">{RESUME_DATA.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                    <MapPin className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Location</p>
                    <p className="text-zinc-100 font-medium">{RESUME_DATA.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Name</label>
                    <input 
                      required
                      name="name"
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-emerald-500/50 text-zinc-100 transition-colors placeholder:text-zinc-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Email</label>
                    <input 
                      required
                      name="email"
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-emerald-500/50 text-zinc-100 transition-colors placeholder:text-zinc-700"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Subject</label>
                  <input 
                    required
                    name="subject"
                    type="text" 
                    placeholder="Project Inquiry"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-emerald-500/50 text-zinc-100 transition-colors placeholder:text-zinc-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Message</label>
                  <textarea 
                    required
                    name="message"
                    rows={4}
                    placeholder="How can I help you?"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-emerald-500/50 text-zinc-100 transition-colors placeholder:text-zinc-700 resize-none"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={formStatus !== 'idle'}
                  className={cn(
                    "w-full py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all",
                    formStatus === 'idle' && "bg-emerald-500 text-black hover:bg-emerald-400",
                    formStatus === 'sending' && "bg-zinc-800 text-zinc-500 cursor-not-allowed",
                    formStatus === 'success' && "bg-emerald-500/20 text-emerald-500 border border-emerald-500/50"
                  )}
                >
                  {formStatus === 'idle' && (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                  {formStatus === 'sending' && (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <Smartphone className="w-4 h-4" />
                    </motion.div>
                  )}
                  {formStatus === 'success' && (
                    <>
                      Message Sent
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-zinc-800 text-center">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-600 mb-4">Let's build something amazing together</p>
          <div className="flex justify-center gap-8 mb-8">
            <a href={`mailto:${RESUME_DATA.contact.email}`} className="text-zinc-400 hover:text-emerald-500 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
            <a href={RESUME_DATA.contact.linkedin} className="text-zinc-400 hover:text-emerald-500 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href={RESUME_DATA.contact.github} className="text-zinc-400 hover:text-emerald-500 transition-colors">
              <Github className="w-6 h-6" />
            </a>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-700">
            &copy; {new Date().getFullYear()} {RESUME_DATA.name}. Built with React & Tailwind.
          </p>
        </footer>
      </main>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>
      {/* Image Full View Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
            onClick={() => setIsImageModalOpen(false)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-6 right-6 p-3 bg-zinc-900/50 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setIsImageModalOpen(false);
              }}
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full aspect-square rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src="/assets/profile.png" 
                alt={RESUME_DATA.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
