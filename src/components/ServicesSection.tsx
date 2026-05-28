import { motion } from 'motion/react';
import { SERVICES } from '../data';
import { Service } from '../types';
import * as LucideIcons from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

// Helper to dynamically render a Lucide Icon based on string name
const ServiceIcon = ({ iconName, className }: { iconName: string; className: string }) => {
  const IconComponent = (LucideIcons as any)[iconName];
  if (!IconComponent) return <LucideIcons.Check className={className} />;
  return <IconComponent className={className} />;
};

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  
  // Custom stagger container animation configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="services" className="py-28 relative bg-[#050505] scroll-mt-10 overflow-hidden">
      {/* Light bars that simulate luxury detailing studio overhead illumination */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D8FF00]/15 to-transparent" />
      <div className="absolute top-1/4 -right-1/4 w-[400px] h-[400px] bg-[#D8FF00]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-[#D8FF00]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#D8FF00] text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">Studio Menu</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            PREMIUM DETAILING <span className="text-[#D8FF00]">SERVICES</span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">
            Expertly-calibrated deep-cleansing, protection, and restoration recipes designed to preserve vehicle structure and elevate visual luxury.
          </p>
        </div>

        {/* Services Grid with Framer Motion Stagger */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SERVICES.map((service: Service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                boxShadow: "0 20px 40px -15px rgba(216, 255, 0, 0.15)",
                borderColor: "rgba(216, 255, 0, 0.4)"
              }}
              className="group relative flex flex-col justify-between rounded-lg bg-[#0e0e11] border border-white/5 p-6 sm:p-8 transition-all duration-300 overflow-hidden"
            >
              {/* Background cover image preview with extremely low opacity initially, brightening on hover */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none"
                style={{ backgroundImage: `url(${service.image})` }}
              />

              {/* Glowing LED corner effect corner indicator */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-[#D8FF00]/10 to-transparent pointer-events-none rounded-tr-lg" />

              <div>
                {/* Header: Icon & Base Price */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#D8FF00] transition-colors duration-300 group-hover:bg-[#D8FF00] group-hover:text-[#050505] group-hover:shadow-[0_0_15px_rgba(216,255,0,0.3)]">
                    <ServiceIcon iconName={service.icon} className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">Est. Investment</span>
                    <span className="text-xl sm:text-2xl font-black text-white group-hover:text-[#D8FF00] transition-colors">{service.price}</span>
                  </div>
                </div>

                {/* Service Name & Duration */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight uppercase flex items-center gap-2 group-hover:text-[#D8FF00] transition-colors">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-400">
                    <LucideIcons.Clock className="w-3.5 h-3.5 text-[#D8FF00] opacity-80" />
                    <span>Duration: {service.duration}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light mb-6">
                  {service.description}
                </p>

                {/* Features Checklist */}
                <div className="space-y-2 border-t border-white/5 pt-5 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <LucideIcons.CheckCircle2 className="w-4 h-4 text-[#D8FF00] shrink-0 mt-0.5 opacity-80" />
                      <span className="text-xs text-gray-300 font-light">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Trigger Button CTA */}
              <button
                onClick={() => onSelectService(service.name)}
                className="w-full py-3 mt-auto rounded-sm border border-white/10 text-center text-xs tracking-widest font-extrabold uppercase text-white hover:text-[#050505] hover:bg-[#D8FF00] hover:border-[#D8FF00] cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5 group/btn"
              >
                <span>Select & Book</span>
                <LucideIcons.ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>

            </motion.div>
          ))}
        </motion.div>

        {/* Highlight footer line */}
        <div className="mt-16 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">
            * Actual service cost varies based on vehicle size class (Hatchback, Sedan, Luxury SUV, Supercar).
          </p>
        </div>

      </div>
    </section>
  );
}
