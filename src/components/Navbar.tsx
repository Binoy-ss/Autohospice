import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleItemClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#050505]/85 backdrop-blur-md shadow-2xl border-b border-white/5'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Part */}
            <div 
              onClick={() => handleItemClick('home')} 
              className="flex items-center gap-2 cursor-pointer group"
            >
              <img
                src="https://res.cloudinary.com/dvikvluu9/image/upload/v1779971918/AUTO_HOSPICE_png_1_jrx7zr.png"
                alt="AUTO HOSPICE"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive ? 'text-[#D8FF00]' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#D8FF00] rounded-full shadow-[0_0_8px_#D8FF00]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* CTA Button Desktop */}
            <div className="hidden md:block">
              <button
                onClick={() => onNavigate('contact')}
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#D8FF00] text-[#050505] font-semibold text-xs tracking-wider uppercase overflow-hidden transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(216,255,0,0.4)] group"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Book Detail</span>
              </button>
            </div>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -mr-2 md:hidden text-white/95 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 top-[70px] z-40 md:hidden bg-[#050505] border-t border-white/5 flex flex-col justify-between p-6"
          >
            <div className="flex flex-col gap-4 pt-4">
              {menuItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`flex items-center justify-between py-3 text-lg font-medium border-b border-white/5 transition-colors ${
                      isActive ? 'text-[#D8FF00] pl-2 font-bold' : 'text-gray-300'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF00] shadow-[0_0_6px_#D8FF00]" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className="mb-10 flex flex-col gap-4">
              <div className="text-center text-xs text-gray-500">
                <span className="flex items-center justify-center gap-1.5 mb-2 text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-[#D8FF00]" /> Precision Detailing Standard
                </span>
                Luxury Care for high-end motorcars
              </div>
              <button
                onClick={() => handleItemClick('contact')}
                className="w-full text-center py-4 rounded-sm bg-[#D8FF00] text-[#050505] font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_20px_#D8FF00]"
              >
                Schedule Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
