import { useState, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookingState } from '../types';
import { SERVICES } from '../data';
import { Calendar, Phone, Car, MessageCircle, AlertCircle, CheckCircle2, ChevronRight, Award } from 'lucide-react';

interface BookingSectionProps {
  preselectedService: string;
}

export default function BookingSection({ preselectedService }: BookingSectionProps) {
  const [form, setForm] = useState<BookingState>({
    name: '',
    phone: '',
    vehicleType: 'Sedan / Luxury Sedan',
    vehicleModel: '',
    service: preselectedService || 'Ceramic Coating',
    preferredDate: '',
    preferredTime: '10:00 AM',
    message: ''
  });

  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedStatus, setBookedStatus] = useState<boolean>(false);
  const [generatedBookingId, setGeneratedBookingId] = useState('');

  // Sync state if category was pushed from parent
  useState(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, service: preselectedService }));
    }
  });

  const vehicleOptions = [
    'Hatchback / Compact',
    'Sedan / Luxury Sedan',
    'SUV / Premium Compact SUV',
    'Luxury SUV / MPV',
    'Supercar / High Performance Exotic'
  ];

  const timeOptions = [
    '09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getWhatsAppURL = (data: BookingState, bookingId?: string) => {
    const phoneNum = "919363837901";
    const textStr = `*AUTO HOSPICE APPOINTMENT REQUEST*\n` +
      `--------------------------------\n` +
      `${bookingId ? `*Booking ID:* ${bookingId}\n` : ''}` +
      `*Client:* ${data.name}\n` +
      `*Phone:* ${data.phone}\n` +
      `*Vehicle Category:* ${data.vehicleType}\n` +
      `*Vehicle Model:* ${data.vehicleModel || 'Not Specified'}\n` +
      `*Requested Service:* ${data.service}\n` +
      `*Preferred Date:* ${data.preferredDate}\n` +
      `*Preferred Time Slot:* ${data.preferredTime}\n` +
      `*Additional Details:* ${data.message || 'None'}\n\n` +
      `_Please confirm availability and lock down this slot._`;

    return `https://wa.me/${phoneNum}?text=${encodeURIComponent(textStr)}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.preferredDate) {
      alert("Please supply your Name, Phone Number, and Preferred Date.");
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury studio database locking animation
    setTimeout(() => {
      const randomId = `AH-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedBookingId(randomId);
      setIsSubmitting(false);
      setBookedStatus(true);
    }, 1500);
  };

  const currentPreselectedServiceDetails = SERVICES.find(s => s.name === form.service);

  return (
    <section id="contact" className="py-24 relative bg-[#050505] scroll-mt-10 overflow-hidden">
      
      {/* Visual lighting grids for detailed bay look */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D8FF00]/15 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute -bottom-40 right-10 w-[400px] h-[400px] bg-[#D8FF00]/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#D8FF00] text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">Reservation Hub</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            SECURE YOUR <span className="text-[#D8FF00]">DETAIL SLOT</span>
          </h2>
          <p className="mt-4 text-gray-400 text-xs sm:text-sm">
            Book online and instantly sync with our specialists over WhatsApp. We will confirm your session options, pickup/delivery arrangements, and paint assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Form Side (Column span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {!bookedStatus ? (
                <motion.div
                  key="booking-form-box"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-lg bg-[#0e0e11] border border-white/5 p-6 sm:p-8 relative overflow-hidden shadow-2xl"
                >
                  {/* Subtle background wash effect */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#D8FF00] via-white/10 to-[#D8FF00] opacity-80" />

                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Two Column Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2">
                          Client Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleInputChange}
                            onFocus={() => setActiveInput('name')}
                            onBlur={() => setActiveInput(null)}
                            placeholder="Your Full Name"
                            className={`w-full py-3.5 px-4 bg-white/2 border rounded-sm text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-300 ${
                              activeInput === 'name' 
                                ? 'border-[#D8FF00] bg-white/5 shadow-[0_0_10px_rgba(216,255,0,0.15)]' 
                                : 'border-white/5 hover:border-white/10'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2">
                          Mobile Number *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={form.phone}
                            onChange={handleInputChange}
                            onFocus={() => setActiveInput('phone')}
                            onBlur={() => setActiveInput(null)}
                            placeholder="E.g., +91 93638 37901"
                            className={`w-full py-3.5 px-4 bg-white/2 border rounded-sm text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-300 ${
                              activeInput === 'phone' 
                                ? 'border-[#D8FF00] bg-white/5 shadow-[0_0_10px_rgba(216,255,0,0.15)]' 
                                : 'border-white/5 hover:border-white/10'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Two Column Vehicle Type & Model Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2">
                          Vehicle Size Class
                        </label>
                        <select
                          name="vehicleType"
                          value={form.vehicleType}
                          onChange={handleInputChange}
                          className="w-full py-3.5 px-4 bg-[#0e0e11] border border-white/5 text-gray-300 rounded-sm text-sm focus:outline-none focus:border-[#D8FF00] focus:ring-1 focus:ring-[#D8FF00] transition-colors"
                        >
                          {vehicleOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#050505] text-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="relative">
                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2">
                          Make & Model
                        </label>
                        <input
                          type="text"
                          name="vehicleModel"
                          value={form.vehicleModel}
                          onChange={handleInputChange}
                          onFocus={() => setActiveInput('model')}
                          onBlur={() => setActiveInput(null)}
                          placeholder="E.g. Porsche GTS / Fortuner"
                          className={`w-full py-3.5 px-4 bg-white/2 border rounded-sm text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-300 ${
                            activeInput === 'model' 
                              ? 'border-[#D8FF00] bg-white/5 shadow-[0_0_10px_rgba(216,255,0,0.15)]' 
                              : 'border-white/5 hover:border-white/10'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Service Selection dropdown linking from Services section */}
                    <div className="relative">
                      <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2">
                        Preferred Service Recipe
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleInputChange}
                        className="w-full py-3.5 px-4 bg-[#0e0e11] border border-white/5 text-gray-300 rounded-sm text-sm focus:outline-none focus:border-[#D8FF00] cursor-pointer"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.name} className="bg-[#050505] text-white">
                            {s.name} ({s.price})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Pre-fill dates or times */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          name="preferredDate"
                          required
                          value={form.preferredDate}
                          onChange={handleInputChange}
                          className="w-full py-3.5 px-4 bg-white/2 border border-white/5 rounded-sm text-sm text-white focus:outline-none focus:border-[#D8FF00] cursor-pointer"
                        />
                      </div>

                      <div className="relative">
                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2">
                          Preferred Time Frame
                        </label>
                        <select
                          name="preferredTime"
                          value={form.preferredTime}
                          onChange={handleInputChange}
                          className="w-full py-3.5 px-4 bg-[#0e0e11] border border-white/5 text-gray-300 rounded-sm text-sm focus:outline-none focus:border-[#D8FF00]"
                        >
                          {timeOptions.map((time) => (
                            <option key={time} value={time} className="bg-[#050505] text-white">
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message Details */}
                    <div className="relative">
                      <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2">
                        Specific paint conditions or notes
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleInputChange}
                        onFocus={() => setActiveInput('msg')}
                        onBlur={() => setActiveInput(null)}
                        rows={3}
                        placeholder="Detail any heavy swirl marks, water stains, customized wrap requirements, or specific requests..."
                        className={`w-full py-3 px-4 bg-white/2 border rounded-sm text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-300 resize-none ${
                          activeInput === 'msg' 
                            ? 'border-[#D8FF00] bg-white/5 shadow-[0_0_10px_rgba(216,255,0,0.15)]' 
                            : 'border-white/5 hover:border-white/10'
                        }`}
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-4">
                      {/* Booking submit button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-4 bg-[#D8FF00] text-[#050505] hover:bg-white transition-all duration-300 font-black text-xs uppercase tracking-widest rounded-sm focus:outline-none hover:shadow-[0_0_25px_rgba(216,255,0,0.45)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-[#050505] border-t-transparent animate-spin" />
                            <span>Scheduling...</span>
                          </>
                        ) : (
                          <>
                            <Calendar className="w-4 h-4" />
                            <span>Schedule Appointment</span>
                          </>
                        )}
                      </button>

                      {/* Instant WhatsApp alternative */}
                      <a
                        href={getWhatsAppURL(form)}
                        target="_blank"
                        rel="noreferrer"
                        className="py-4 px-6 border border-white/10 text-white hover:border-[#D8FF00] hover:text-[#D8FF00] transition-all bg-white/2 hover:bg-[#D8FF00]/5 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest rounded-sm"
                      >
                        <MessageCircle className="w-4 h-4 text-[#D8FF00] fill-[#D8FF00]/10" />
                        <span>Instant WhatsApp Book</span>
                      </a>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="booking-success-box"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-lg bg-[#0e0e11] border-2 border-[#D8FF00]/40 p-8 relative overflow-hidden shadow-2xl text-center space-y-6"
                >
                  <div className="absolute inset-0 bg-[#D8FF00]/1 pointer-events-none" />
                  
                  {/* Glowing seal of workmanship */}
                  <div className="w-16 h-16 rounded-full bg-[#D8FF00]/10 border border-[#D8FF00] flex items-center justify-center mx-auto text-[#D8FF00] shadow-[0_0_15px_rgba(216,255,0,0.3)]">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div>
                    <span className="text-[#D8FF00] text-[10px] font-bold uppercase tracking-[0.3em]">RESERVATION LOCKED</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase mt-1">APPOINTMENT REGISTERED</h3>
                    <div className="mt-3 text-xs text-gray-500">
                      BOOKING ID: <span className="font-mono text-white bg-white/5 border border-white/10 px-2.5 py-1 rounded-sm tracking-widest">{generatedBookingId}</span>
                    </div>
                  </div>

                  <div className="bg-white/2 border border-white/5 p-5 text-left rounded space-y-3 max-w-md mx-auto text-xs">
                    <div className="flex justify-between text-gray-400">
                      <span>Owner:</span>
                      <strong className="text-white font-medium">{form.name}</strong>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Recipe Category:</span>
                      <strong className="text-[#D8FF00] font-medium">{form.service}</strong>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Vehicle Code:</span>
                      <strong className="text-white font-medium">{form.vehicleModel || 'Restoration Target'} ({form.vehicleType.split(' ')[0]})</strong>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Target Date:</span>
                      <strong className="text-white font-medium">{form.preferredDate} @ {form.preferredTime}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 max-w-md mx-auto font-light leading-relaxed">
                    To immediately guarantee this time slot and discuss paint measurements, please click below to send this digital receipt card to our detailing manager on WhatsApp.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={getWhatsAppURL(form, generatedBookingId)}
                      target="_blank"
                      rel="noreferrer"
                      className="py-4 px-8 bg-[#D8FF00] text-[#050505] hover:bg-white transition-all duration-300 font-black text-xs uppercase tracking-widest rounded-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(216,255,0,0.5)]"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Sync via WhatsApp</span>
                    </a>
                    
                    <button
                      onClick={() => setBookedStatus(false)}
                      className="py-4 px-6 border border-white/5 text-gray-400 hover:text-white hover:border-white/20 transition-all text-xs font-bold uppercase tracking-widest rounded-sm"
                    >
                      New Appointment
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Details / Brand Sidebar (Column span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 lg:pl-4">
            
            {/* Dynamic preview detail of chosen service if any */}
            {currentPreselectedServiceDetails && (
              <div className="p-6 sm:p-8 rounded-lg bg-[#0e0e11] border border-white/5 space-y-4">
                <div className="flex items-center gap-2.5 text-[#D8FF00]">
                  <Award className="w-5 h-5" />
                  <span className="text-[10px] tracking-[0.25em] font-bold uppercase">SELECTED OPTION</span>
                </div>
                <h3 className="text-xl font-bold uppercase text-white tracking-tight">{currentPreselectedServiceDetails.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{currentPreselectedServiceDetails.description}</p>
                <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs">
                  <span className="text-gray-500 uppercase">Estimated Service Investment:</span>
                  <strong className="text-white text-base font-bold">{currentPreselectedServiceDetails.price}</strong>
                </div>
              </div>
            )}

            {/* Quick Contact guidelines */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                STUDIO DIRECT LINES
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#D8FF00] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-gray-500 font-semibold">Immediate Hotline</span>
                    <a href="tel:+919363837901" className="text-sm font-bold text-white hover:text-[#D8FF00] transition-colors">
                      +91 93638 37901
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#D8FF00] shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-gray-500 font-semibold">Location & Studio Base</span>
                    <p className="text-xs text-gray-300 font-light mt-0.5 leading-relaxed">
                      AUTO HOSPICE DETAILED LABS<br />
                      Nagercoil Road area, Tamil Nadu, India.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Aesthetic highlight banner */}
            <div className="p-6 rounded bg-[#D8FF00]/2 border border-[#D8FF00]/10 flex items-start gap-3 text-xs">
              <AlertCircle className="w-5 h-5 text-[#D8FF00] shrink-0" />
              <div className="space-y-1">
                <strong className="block text-[#D8FF00] font-bold uppercase">Pickup & Delivery option</strong>
                <span className="text-gray-400 font-light leading-relaxed">We offer premium enclosed micro-car transporter towing. Your high-performance vehicle never touches elements prior to detail application.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
