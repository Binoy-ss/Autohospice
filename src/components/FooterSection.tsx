import { Instagram, MapPin, Phone, MessageSquare, Shield, Clock, Hourglass } from 'lucide-react';

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] pt-24 pb-12 overflow-hidden border-t border-white/5 wet-reflection">
      
      {/* LED overhead glow reflection simulation */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#D8FF00]/40 to-transparent shadow-[0_0_15px_#D8FF00]" />
      <div className="absolute bottom-0 right-[10%] w-[350px] h-[350px] bg-[#D8FF00]/2 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Upper footer footer block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          
          {/* Brand Info (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            <img
              src="https://res.cloudinary.com/dvikvluu9/image/upload/v1779971918/AUTO_HOSPICE_png_1_jrx7zr.png"
              alt="AUTO HOSPICE"
              className="h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
              Elite automotive hygiene and luxury protection. From pH-neutral foam cleansing to precision multi-stage paint corrections, Nano Quartz coatings, and premium TPU clear bra wrapping.
            </p>

            {/* Social Connection Badges */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/auto_hospice/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 hover:border-[#D8FF00] hover:text-[#D8FF00] text-gray-300 transition-all flex items-center justify-center cursor-pointer shadow-lg"
                aria-label="Instagram handle"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/919363837901"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 hover:border-[#D8FF00] hover:text-[#D8FF00] text-gray-300 transition-all flex items-center justify-center cursor-pointer shadow-lg"
                aria-label="WhatsApp handle"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Business Hours & Features (4 Columns) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
            {/* Quick Contact info */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[#D8FF00] font-bold">Studio Hours</h4>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gray-500" /> Mon - Sat:</span>
                  <span className="font-semibold text-white">09:00 AM - 07:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="flex items-center gap-1.5"><Hourglass className="w-3.5 h-3.5 text-gray-500" /> Sunday:</span>
                  <span className="font-bold text-[#D8FF00]">By Prior Booking</span>
                </div>
              </div>
            </div>

            {/* Quality badge card */}
            <div className="p-4 rounded bg-white/2 border border-white/5 flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#D8FF00] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="block text-[11px] text-white uppercase font-extrabold tracking-wider">Workmanship Warranty</strong>
                <p className="text-[10px] text-gray-500 leading-relaxed font-light">All Nano-Ceramic recipes are accompanied by official laboratory hardness certificate standards.</p>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Embed (4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D8FF00]" />
              <span>Studio Location Coordinates</span>
            </h4>
            <div className="rounded overflow-hidden border border-white/10 shadow-xl bg-black">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4919.854950976408!2d77.27155837586892!3d8.280675300251835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0455fbd44fff45%3A0x8a76824057955e94!2sAUTO%20HOSPICE!5e1!3m2!1sen!2sin!4v1779972504747!5m2!1sen!2sin" 
                width="100%" 
                height="180" 
                style={{ border: 0 }}
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="AUTO HOSPICE Location Map"
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-gray-500">
              <span>Nagercoil Road area, Tamil Nadu</span>
              <a
                href="https://maps.google.com/?q=AUTO+HOSPICE"
                target="_blank"
                rel="noreferrer"
                className="text-[#D8FF00] hover:underline"
              >
                Open Google Maps
              </a>
            </div>
          </div>

        </div>

        {/* Lower footer copyright lines */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            <span>&copy; {currentYear} </span>
            <span className="font-semibold text-gray-300">AUTO HOSPICE DETAILED LABS</span>
            <span>. All Rights Reserved.</span>
          </div>

          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Precision Standards</span>
            <span className="hover:text-white transition-colors">&middot;</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Ceramic Shielding</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
