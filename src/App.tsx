import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import AboutSection from './components/AboutSection';
import BookingSection from './components/BookingSection';
import FooterSection from './components/FooterSection';
import { Sparkles, Calendar, Heart, Shield, Compass } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedService, setSelectedService] = useState<string>('9H Nano Ceramic Coating'); // Default initial prefill option
  const [isHeroComplete, setIsHeroComplete] = useState<boolean>(false);

  // Reading raw scroll progress to render an aesthetic, razor-thin neon header indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track the visible section in viewport to sync the Nav indicator
  useEffect(() => {
    const sections = ['home', 'services', 'gallery', 'about', 'contact'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.35, rootMargin: '-10% 0px -40% 0px' }
      );
      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate header offset for precise alignment
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    scrollToSection('contact');
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#D8FF00] selection:text-[#050505]">
      
      {/* Absolute top neon visual scroll progress indicator */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#D8FF00] origin-left z-[100] shadow-[0_0_12px_#D8FF00]"
      />

      {/* Floating glowing grid particles details */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-3 bg-[radial-gradient(rgba(216,255,0,0.15)_1.2px,transparent_1.2px)] bg-[size:32px_32px]" />

      {/* 1. Transparent glassmorphism Sticky Navbar */}
      <Navbar 
        activeSection={activeSection} 
        onNavigate={scrollToSection} 
      />

      {/* 2. Hero Cinematic Section (Frame-by-frame scroll sequence) */}
      <Hero onNavigate={scrollToSection} onHeroComplete={setIsHeroComplete} />

      {/* Main flow items & Footer wrapped in a beautiful, transitionable motion layout */}
      <motion.div
        animate={{ 
          opacity: isHeroComplete ? 1 : 0,
          y: isHeroComplete ? 0 : 40,
        }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-25 origin-top transition-all duration-700 ${isHeroComplete ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {/* Interactive divider strip that simulates premium garage LED line separator */}
        <div className="relative h-1.5 w-full bg-[#050505] z-30 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D8FF00]/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        {/* Main flow items */}
        <main className="relative z-20">
          
          {/* 3. Services Section with glass cards */}
          <ServicesSection onSelectService={handleSelectService} />

          {/* 4. Interactive Before & After comparison slider */}
          <BeforeAfterSlider />

          {/* 5. Portfolio Section with masonry layout and custom zoom list item modals */}
          <GallerySection />

          {/* 6. About detailing credentials */}
          <AboutSection />

          {/* 7. Dedicated Booking Section (WhatsApp & Schedule Appointment) */}
          <BookingSection preselectedService={selectedService} />

        </main>

        {/* 8. Footer Section with coordinates map and details */}
        <FooterSection />
      </motion.div>

    </div>
  );
}
