import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { Maximize2, X, Sparkles, ChevronRight, Eye } from 'lucide-react';

export default function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Dynamically extract categories
  const categories = ['All', 'Ceramic Coating', 'PPF Armor', 'Interior Detailing'];

  const filteredItems = activeCategory === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-[#0a0a0c] border-b border-white/5 scroll-mt-10 relative">
      <div className="absolute top-0 right-1/4 w-[1px] h-32 bg-gradient-to-b from-white/10 to-transparent" />
      <div className="absolute -top-40 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-[#D8FF00]/2 to-transparent blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headings */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[#D8FF00] text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">Our Workmanship</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              CINEMATIC <br className="hidden sm:inline" /><span className="text-[#D8FF00]">STUDIO GALLERY</span>
            </h2>
            <p className="mt-4 text-gray-400 text-xs sm:text-sm">
              Untouched, high-fidelity portfolio snapshots highlighting paint reflection uniformity, perfect edge wrap PPF fits, and pristine cabin restorations.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2 md:pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-sm transition-all duration-300 relative cursor-pointer ${
                  activeCategory === category
                    ? 'text-[#050505] bg-[#D8FF00] font-extrabold shadow-[0_0_15px_rgba(216,255,0,0.35)]'
                    : 'text-gray-400 bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid Layout with scale reveal animations */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative aspect-[4/3] rounded-sm overflow-hidden border border-white/5 bg-white/2 cursor-pointer shadow-xl overflow-hidden"
                onClick={() => setSelectedItem(item)}
              >
                {/* Image tag */}
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16, 1, 0.3, 1] group-hover:scale-108 group-hover:brightness-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Glassmorphism gradient shade overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/10 opacity-75 group-hover:opacity-85 transition-opacity" />

                {/* Interactive HUD highlight indicators */}
                <div className="absolute inset-4 border border-white/0 group-hover:border-[#D8FF00]/15 transition-colors duration-400 pointer-events-none rounded-sm">
                  {/* Neon light corner tick indicators */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-transparent group-hover:border-[#D8FF00]/60 transition-colors" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-[#D8FF00]/60 transition-colors" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-[#D8FF00]/60 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-transparent group-hover:border-[#D8FF00]/60 transition-colors" />
                </div>

                {/* Floating view circle helper */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-sm bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  <Eye className="w-4 h-4 text-[#D8FF00]" />
                </div>

                {/* Photo Content Card */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10">
                  <span className="inline-flex items-center gap-1 text-[9px] tracking-wider font-semibold text-[#D8FF00] uppercase mb-1.5 px-2 py-0.5 rounded-full bg-[#D8FF00]/10 border border-[#D8FF00]/30">
                    <Sparkles className="w-2.5 h-2.5" />
                    {item.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase group-hover:text-[#D8FF00] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-light mt-1.5 opacity-0 group-hover:opacity-100 transition-all duration-550 max-w-sm">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Overlay Screen Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 select-none"
              onClick={() => setSelectedItem(null)}
            >
              <div 
                className="relative max-w-5xl w-full bg-[#0e0e11] border border-white/10 rounded-lg overflow-hidden flex flex-col md:flex-row shadow-[0_0_30px_#000]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Main image */}
                <div className="relative aspect-[4/3] md:aspect-auto md:h-[500px] flex-1 bg-black overflow-hidden">
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Detail right panel */}
                <div className="p-6 md:p-8 w-full md:w-80 flex flex-col justify-between bg-[#121216] border-t md:border-t-0 md:border-l border-white/5">
                  <div className="space-y-4">
                    <div className="text-xs uppercase tracking-widest font-semibold text-[#D8FF00] bg-[#D8FF00]/5 px-3 py-1.5 rounded-sm border border-[#D8FF00]/20 inline-block">
                      {selectedItem.category}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                      {selectedItem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                      {selectedItem.subtitle}
                    </p>

                    <div className="border-t border-white/5 pt-4 space-y-2 mt-4 text-[11px] text-gray-500 uppercase">
                      <div className="flex justify-between">
                        <span>Lighting Class:</span>
                        <span className="text-gray-300">Studio Tuned LED</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Reflection Grade:</span>
                        <span className="text-[#D8FF00]">Extreme Mirror Finish</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Coating Layer:</span>
                        <span className="text-gray-300">9H Nano Ceramic</span>
                      </div>
                    </div>
                  </div>

                  {/* Close and Actions */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex gap-3">
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="flex-1 py-3 bg-[#D8FF00] hover:bg-white text-[#050505] font-extrabold text-xs uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Close View </span>
                    </button>
                  </div>
                </div>

                {/* Close absolute node button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-[#D8FF00] text-gray-300 hover:text-black hover:scale-105 transition-all flex items-center justify-center pointer-events-auto border border-white/10"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
