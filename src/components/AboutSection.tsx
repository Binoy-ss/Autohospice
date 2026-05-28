import { motion } from 'motion/react';
import { ShieldCheck, Flame, Medal, Award, Compass, Sparkles } from 'lucide-react';

export default function AboutSection() {
  
  // High-performance feature points
  const standards = [
    {
      icon: Award,
      title: "Certified Detailers",
      desc: "Our detailing specialists are fully certified in premium liquid quartz, 9H nano application, and paint correction therapy."
    },
    {
      icon: Medal,
      title: "Reflection Lights Tunnel",
      desc: "Equipped with specialized high-CRI inspection light tunnels of variable wavelengths to make the smallest swirl marks visible."
    },
    {
      icon: ShieldCheck,
      title: "Genuine Premium Brands",
      desc: "We exclusively formulate treatments using certified products sourced from leading laboratories in Germany and Japan."
    }
  ];

  return (
    <section id="about" className="py-28 relative bg-[#050505] overflow-hidden border-b border-white/5 scroll-mt-10">
      
      {/* 1. Floating Smoke / Vapor Ambient Illusion Effects using CSS keyframes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/10 w-[450px] h-[450px] rounded-full bg-[#D8FF00]/2 blur-[100px] animate-smoke-flow" />
        <div className="absolute bottom-1/4 right-1/10 w-[550px] h-[550px] rounded-full bg-[#D8FF00]/1.5 blur-[120px] animate-smoke-flow" style={{ animationDelay: '-10s' }} />
      </div>

      {/* 2. Animated Laser Light sweeps - visual representation of paint corrector scanning */}
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none overflow-hidden z-10 opacity-30">
        <motion.div 
          animate={{ y: [0, 160, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#D8FF00] to-transparent shadow-[0_0_10px_#D8FF00]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text Content Block (Left / 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-[#D8FF00] text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">The Studio</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
                THE CRAFT OF <br />
                <span className="text-[#D8FF00]">AUTO HOSPICE</span>
              </h2>
            </div>

            {/* Main high-status statement with large typography */}
            <p className="text-lg sm:text-2xl text-gray-200 font-light leading-relaxed tracking-wide">
              AUTO HOSPICE is a premier automotive detailing studio delivering state-of-the-art wash, deep correction, 9H nano ceramic barrier coatings, and self-healing paint protection film (PPF) experiences.
            </p>

            <div className="text-gray-400 font-light text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                We operate with the absolute conviction that detailing is not a service—it is an art form of surgical precision. To deliver the deepest shine, your vehicle goes through rigorous multi-staged cleansing rituals to completely extract grease, mineral scales, and paint swirl defects.
              </p>
              <p>
                Whether it is a vintage air-cooled classic or a cutting-edge electric supercar, our temperature-stabilized cleaning bays, hyper-filtered water tanks, and dual-bucket Grit Guard shields ensure an entirely micro-scratch-free environment.
              </p>
            </div>

            {/* Metric counters */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
              <div>
                <span className="block text-3xl sm:text-4xl font-extrabold text-[#D8FF00] tracking-tight">4,800+</span>
                <span className="block text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest font-semibold mt-1">Cars Revitalized</span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-extrabold text-[#D8FF00] tracking-tight">100%</span>
                <span className="block text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest font-semibold mt-1">Grit Guard Safe</span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-extrabold text-[#D8FF00] tracking-tight">9H</span>
                <span className="block text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest font-semibold mt-1">Ceramic Standard</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Block with Floating detail details (Right / 5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-white/10 p-1 bg-[#0a0a0c] shadow-2xl">
              {/* Outer frame scanning line */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#D8FF00]/5 via-transparent to-transparent pointer-events-none" />

              {/* Showcase Detailer image */}
              <div className="relative aspect-[4/5] rounded-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800" 
                  alt="Precision detailing lights" 
                  className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-85 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Wet surface sheen highlights */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />

                {/* HUD Overlay indicator lines */}
                <div className="absolute bottom-6 left-6 right-6 z-20 p-5 bg-[#050505]/95 backdrop-blur-md rounded border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D8FF00] animate-pulse" />
                    <span className="text-[10px] font-bold tracking-[0.25em] text-gray-300 uppercase">STUDIO SYSTEM</span>
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Dust-Free Air Filtration</h4>
                  <p className="text-[11px] text-gray-400 font-light mt-1">Our studio utilizes isolated air extraction limits to minimize suspended dust particles during paint curing.</p>
                </div>
              </div>
            </div>

            {/* Absolute badge */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-black border border-[#D8FF00]/30 shadow-2xl flex items-center justify-center text-center p-2 transform rotate-12 backdrop-blur-md hidden sm:flex">
              <span className="text-[10px] tracking-widest font-bold text-[#D8FF00] uppercase leading-tight">ISO<br/>9001<br/>CERT</span>
            </div>
          </div>

        </div>

        {/* Quality Standards Boxes */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {standards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-6 sm:p-8 rounded-sm bg-white/2 border border-white/5 hover:border-[#D8FF00]/15 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#D8FF00] mb-5 group-hover:bg-[#D8FF00] group-hover:text-[#050505] transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2 group-hover:text-[#D8FF00] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
