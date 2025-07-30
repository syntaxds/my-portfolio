import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import profileImage from '../images/profile-picture.jpg';
import Project1Image from '../images/Project1.png';
import Project2Image from '../images/Project2.png';
import Project3Image from '../images/Project3.png';
import { FaLinkedin } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { ChevronDown, Github, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import './carousel-hide-scrollbar.css'; 

// API Configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus(''), 5000);
      } else {
        setSubmitStatus('error');
        setError(data.error || 'Failed to send message');
        setTimeout(() => {
          setSubmitStatus('');
          setError('');
        }, 5000);
      }
    } catch (error) {
      setSubmitStatus('error');
      setError('Network error. Please check your connection and try again.');
      console.error('Network error:', error);
      setTimeout(() => {
        setSubmitStatus('');
        setError('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto"
    >
      <motion.div variants={itemVariants}>
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 transition-colors"
          required
          disabled={isSubmitting}
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 transition-colors"
          required
          disabled={isSubmitting}
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows="4"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 transition-colors resize-none"
          required
          disabled={isSubmitting}
        />
      </motion.div>
      
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        variants={itemVariants}
        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </motion.button>
      
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-400 text-center font-medium"
        >
          ✅ Message sent successfully! I'll get back to you soon.
        </motion.div>
      )}
      
      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-center font-medium"
        >
          ❌ {error || 'Failed to send message. Please try again.'}
        </motion.div>
      )}
    </motion.form>
  );
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(null);
  const [scrollStartX, setScrollStartX] = useState(null);

  // Fallback images - you can replace these with your actual images
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23D1D5DB' font-family='Arial, sans-serif' font-size='16'%3EProject Image%3C/text%3E%3C/svg%3E";


  // Skills with fallback icons
  const skills = [
    { name: 'React', icon: require('../images/skills/react.png') },
    { name: 'Express.js', icon: require('../images/skills/express.png') },
    { name: 'Node.js', icon: require('../images/skills/nodejs.png') },
    { name: 'Android Studio', icon: require('../images/skills/androidstudio.png') },
    { name: 'HTML', icon: require('../images/skills/html.png') },
    { name: 'Tailwind CSS', icon: require('../images/skills/tailwind.png') },
    { name: 'CSS', icon: require('../images/skills/css.png') },
    { name: 'Javascript', icon: require('../images/skills/javascript.png') },
    { name: 'Python', icon: require('../images/skills/python.png') },
    { name: 'PHP', icon: require('../images/skills/php.png') },
    { name: 'Java', icon: require('../images/skills/java.png') },
    { name: 'Burpsuite', icon: require('../images/skills/burpsuite.png') },
    { name: 'Wireshark', icon: require('../images/skills/wireshark.png') },
    { name: 'NetworkMiner', icon: require('../images/skills/networkminer.png') },
    { name: 'MySQL', icon: require('../images/skills/mysql.png') },
  ];

  // Duplicate skills for seamless looping
  const seamlessSkills = [...skills, ...skills, ...skills];

  const carouselRef = useRef(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let scrollInterval;
    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (!isDragging) {
          el.scrollLeft += 1;
          // Seamless loop: reset to start when halfway
          if (el.scrollLeft >= el.scrollWidth / 2 - el.clientWidth) {
            el.scrollLeft = 0;
          }
        }
      }, 20);
    };

    startScrolling();
    return () => clearInterval(scrollInterval);
  }, [isDragging]);

  // Seamless drag/swipe
  const handleDrag = () => {
    const el = carouselRef.current;
    if (!el) return;
    // If user drags past halfway, reset to start
    if (el.scrollLeft >= el.scrollWidth / 2) {
      el.scrollLeft = 0;
    }
    // If user drags to the very start, reset to halfway
    if (el.scrollLeft <= 0) {
      el.scrollLeft = el.scrollWidth / 2;
    }
  };

  const projects = [
    {
      id: 1,
      title: 'PT Padas Mustapa Jaya Website',
      description: 'Corporate website for PT Padas Mustapa Jaya, showcasing company information, services, and contact details.',
      image: Project1Image,
      demo: 'https://pmjsystem.com',
      tags: ['HTML', 'CSS', 'WordPress', 'PHP', 'JavaScript']
    },
    {
      id: 2,
      title: 'Risk Assessment Sytem',
      description: 'A web-based Risk Assessment platform designed to evaluate and manage security risks based on the NIST 800 series standards. This tool helps organizations identify vulnerabilities, assess potential impacts, and implement effective mitigation strategies to strengthen their cybersecurity posture.',
      image: Project2Image,
      github: 'https://github.com/vikoadrian32/riskassessmentproject',
      demo: '#',
      tags: ['HTML', 'Python']
    },
    {
      id: 3,
      title: 'Server-Side Internet Programming',
      description: 'Beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
      image: Project3Image,
      github: 'https://github.com/GitVerseRALF/Server-Side-Internet-Programming',
      demo: '#',
      tags: ['PHP', 'Bootstrap', 'PhpMyAdmin', 'JavaScript', 'HTML', 'CSS']
    },
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    setActiveSection(sectionId);
  };

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="text-xl font-bold cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('hero')}
            >
              Derryl Sipahutar
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['hero', 'about', 'skills', 'projects', 'contact'].map((section) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section === 'hero' ? 'Home' : section}
                </motion.button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
                <span className={`block w-6 h-0.5 bg-white mt-1 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-white mt-1 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
              </div>
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black border-t border-gray-800"
            >
              <div className="px-4 py-2 space-y-2">
                {['hero', 'about', 'skills', 'projects', 'contact'].map((section) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`block w-full text-left py-2 capitalize transition-colors ${
                      activeSection === section ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    whileHover={{ x: 10 }}
                  >
                    {section === 'hero' ? 'Home' : section}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
        
        <motion.div
          className="text-center z-10 max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Just build it
            <br />
            <span className="text-gray-400">with passion</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Give you better solution from code
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={() => scrollToSection('about')}
              className="px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get to Know Me
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border border-gray-600 rounded-lg font-medium hover:border-gray-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold mb-12"
            >
              "Not everything powerful
              <br />
              has to look complicated"
            </motion.h2>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row items-center gap-12"
            >
              <div className="flex-1 flex justify-center items-center">
                <div className="w-64 h-64 relative aspect-square">
                  <motion.img 
                  src= {profileImage || placeholderImage} 
                  alt="Professional headshot of Derryl Sipahutar with friendly expression, wearing business casual attire"
                  className="w-full h-full object-cover shadow-lg border-4 border-white"
                  style={{ transform: 'scale(1)' }} // Menggunakan objek untuk style
                  whileHover={{ scale: 1.10 }} // Menggunakan Framer Motion untuk efek hover
                  transition={{ duration: 0.8 }} // Menambahkan transisi
                  />
                </div>
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-bold mb-4">Hi!</h3>
                <p className="text-gray-200 text-lg leading-relaxed mb-6">
                  I'm Derryl Sipahutar, a second-year Informatics student at President University with a passion for building modern, user-friendly, and secure websites. I enjoy turning complex problems into simple and elegant solutions through code and thoughtful design. My interests include web development and cybersecurity.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  I have more than 2 years of experience in these fields, but I'm always eager to learn new technologies, solve real-world challenges, and excited to work together with you.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold mb-12"
            >
              Skills
            </motion.h2>

            {/* Carousel */}
            <motion.div
              className="relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    className="relative w-full overflow-x-auto carousel-hide-scrollbar"
                    ref={carouselRef}
                  >
                    <div
                      className="flex space-x-6 px-4 py-2"
                      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                      onMouseDown={(e) => {
                        setIsDragging(true);
                        setDragStartX(e.clientX);
                        setScrollStartX(carouselRef.current.scrollLeft);
                      }}
                      onMouseMove={(e) => {
                        if (isDragging && dragStartX !== null) {
                          const dx = e.clientX - dragStartX;
                          carouselRef.current.scrollLeft = scrollStartX - dx;
                          // Seamless loop logic
                          if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
                            carouselRef.current.scrollLeft = 0;
                            setScrollStartX(0);
                            setDragStartX(e.clientX);
                          }
                          if (carouselRef.current.scrollLeft <= 0) {
                            carouselRef.current.scrollLeft = carouselRef.current.scrollWidth / 2;
                            setScrollStartX(carouselRef.current.scrollWidth / 2);
                            setDragStartX(e.clientX);
                          }
                        }
                      }}
                      onMouseUp={() => {
                        setIsDragging(false);
                        setDragStartX(null);
                        setScrollStartX(null);
                      }}
                      onMouseLeave={() => {
                        setIsDragging(false);
                        setDragStartX(null);
                        setScrollStartX(null);
                      }}
                      onScroll={handleDrag}
                      draggable="false"
                    >
                      {seamlessSkills.map((skill, index) => (
                        <div
                          key={index}
                          className="min-w-[120px] flex-shrink-0 flex flex-col items-center space-y-3"
                        >
                          <div className="w-16 h-16 rounded-full bg-transparent flex items-center justify-center">
                            <img src={skill.icon} alt={skill.name} className="w-10 h-10 object-contain" />
                          </div>
                          <p className="text-white font-medium text-sm">{skill.name}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold mb-12 text-center"
            >
              Featured Projects
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-video overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Github className="w-4 h-4" />
                          <span className="text-sm">Code</span>
                        </motion.a>
                      )}
                      {project.demo && project.demo !== '#' && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm">Demo</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold mb-12"
            >
              Let's Work Together
            </motion.h2>
            
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-left">Get in Touch</h3>
                <p className="text-gray-400 text-left leading-relaxed">
                  I'm always interested in hearing about new projects and opportunities. 
                  Whether you have a project in mind or just want to say hello, 
                  I'd love to hear from you.
                </p>
                
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400">derrylsipahutar@gmail.com</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaLinkedin className="w-5 h-5 text-gray-400" />
                    <a href="https://linkedin.com/in/derryl-sipahutar"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>

                    <div className="flex items-center gap-3">
                      <Github className="w-5 h-5 text-gray-400" />
                      <a href="https://github.com/syntaxds" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      >
                        GitHub
                      </a>
                    </div>

                  <div className="flex items-center gap-3">
                    <IoOpenOutline className="w-5 h-5 text-gray-400" />
                    <Link 
                      to="/photography"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Other Skills
                    </Link>
                  </div>
                </div>
              </div>
              
              <ContactForm />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Derryl Sipahutar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;