import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trash2, ArrowLeftRight } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const startDrag = (e: ReactMouseEvent | ReactTouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const setFixedPos = (pos: number) => {
    setSliderPosition(pos);
  };

  const imageUrl = "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1600";

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0a0c] border-b border-white/5">
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#D8FF00]/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Description */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#D8FF00] text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">Interactive Demo</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            BEFORE & AFTER SHINE
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">
            Drag the vertical slider to witness the high-contrast transition between daily road contamination and our signature mirror-finish ceramic coating on this high-performance vehicle.
          </p>
        </div>

        {/* Interactive Comparison Wrapper */}
        <div className="relative max-w-4xl mx-auto aspect-[16/9] sm:aspect-[1.85/1] rounded-lg overflow-hidden border border-white/10 shadow-2xl select-none" ref={containerRef}>
          
          {/* 1. Pristine / Clean State (Base Layer / Right side) */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={imageUrl} 
              alt="After detailing coating" 
              className="w-full h-full object-cover select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
            {/* Real-time reflection gloss lines overlay to make it look hyper wet */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none mix-blend-overlay" />
            
            {/* After label */}
            <div className="absolute bottom-6 right-6 z-20 px-4 py-2 bg-black/80 backdrop-blur-md rounded-sm border border-[#D8FF00]/40 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D8FF00]" />
              <span className="text-[10px] tracking-[0.2em] font-extrabold text-white uppercase sm:text-xs">AFTER SHINE</span>
            </div>
          </div>

          {/* 2. Dirty State (Clipped Overlay / Left side) */}
          <div 
            className="absolute inset-0 h-full overflow-hidden z-10 border-r border-[#D8FF00]"
            style={{ width: `${sliderPosition}%` }}
          >
            {/* Same image but with heavy dust / dull filters applied */}
            <img 
              src={imageUrl} 
              alt="Before car detailing" 
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              style={{ 
                width: containerRef.current ? containerRef.current.clientWidth : '100vw',
                height: '100%',
                maxWidth: 'none',
                filter: 'sepia(25%) contrast(85%) brightness(65%) grayscale(30%) blur(0.4px)'
              }}
              referrerPolicy="no-referrer"
            />
            
            {/* Semi-transparent dirt texture layer */}
            <div className="absolute inset-0 bg-black/25 mix-blend-multiply opacity-70 pointer-events-none" />
            <div className="absolute inset-0 bg-amber-900/5 mix-blend-color-burn opacity-60 pointer-events-none" />
            
            {/* Rain water stain marks simulate */}
            <div className="absolute inset-0 opacity-15 mix-blend-screen bg-repeat pointer-events-none" 
                 style={{ backgroundImage: `radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.4) 0px, transparent 15px), radial-gradient(ellipse at 70% 60%, rgba(255,255,255,0.3) 0px, transparent 18px), radial-gradient(ellipse at 15% 75%, rgba(255,255,255,0.3) 0px, transparent 12px)` }}>
            </div>

            {/* Before label */}
            <div className="absolute bottom-6 left-6 z-20 px-4 py-2 bg-black/80 backdrop-blur-md rounded-sm border border-white/10 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-orange-500" />
              <span className="text-[10px] tracking-[0.2em] font-extrabold text-gray-300 uppercase sm:text-xs">BEFORE CONTAMINATED</span>
            </div>
          </div>

          {/* 3. Sliding Neon Bar & Hand grip */}
          <div 
            className="absolute top-0 bottom-0 z-30 w-1 bg-[#D8FF00]/80 shadow-[0_0_15px_#D8FF00] cursor-ew-resize group"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#050505] border-[2px] border-[#D8FF00] shadow-[0_0_15px_rgba(216,255,0,0.5)] flex items-center justify-center pointer-events-none transition-transform duration-200 group-hover:scale-110 active:scale-95">
              <ArrowLeftRight className="w-4 h-4 text-[#D8FF00]" />
            </div>
          </div>
        </div>

        {/* Quick Position Selectors */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button 
            onClick={() => setFixedPos(10)}
            className="px-4 py-1.5 rounded-sm border border-white/5 bg-white/2 hover:bg-white/5 text-[10px] sm:text-xs tracking-wider uppercase text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            Show Dirty (10% Clean)
          </button>
          <button 
            onClick={() => setFixedPos(50)}
            className="px-4 py-1.5 rounded-sm border border-[#D8FF00]/20 bg-[#D8FF00]/5 text-[10px] sm:text-xs tracking-wider uppercase text-[#D8FF00] hover:bg-[#D8FF00]/10 transition-all cursor-pointer font-medium"
          >
            Center Split (50/50)
          </button>
          <button 
            onClick={() => setFixedPos(90)}
            className="px-4 py-1.5 rounded-sm border border-white/5 bg-white/2 hover:bg-white/5 text-[10px] sm:text-xs tracking-wider uppercase text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            Show Pristine (90% Clean)
          </button>
        </div>

      </div>
    </section>
  );
}
