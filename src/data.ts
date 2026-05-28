import { Service, GalleryItem, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: "premium-wash",
    name: "Premium Wash",
    duration: "60 - 90 Mins",
    price: "₹1,499",
    description: "Detailed hand wash with premium dual-bucket grit gard methodology, pH-neutral luxury shampoo, micro-fiber air blow drying, and tyre dressing conditioning.",
    features: [
      "pH-neutral luxury shampoo bath",
      "Wheel arches deep decontamination",
      "Compressed air high-pressure blow drying",
      "Tyre detailing & premium gel dressing",
      "Interior vacuuming & basic dash wipe"
    ],
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "foam-wash",
    name: "Hyper-Foam Wash",
    duration: "45 Mins",
    price: "₹899",
    description: "Immersive high-density snow foam pre-soak that safely encapsulates and lifts surface abrasive contaminants prior to touch-wash conditioning.",
    features: [
      "Ultra-thick Snow Foam pre-soak treatment",
      "Delicate high-grade plush microfiber hand wash",
      "High-pressure clean water under-body rinse",
      "Glass cleaning & water spot prevention spray",
      "Luxury spray sealant hydrophobic coat"
    ],
    icon: "Waves",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ceramic-coating",
    name: "Nano Ceramic Coating",
    duration: "2 - 3 Days",
    price: "₹18,999",
    description: "9H Hardness nano-crystalline chemical barrier offering elite hydrophobic protection, deep gloss rejuvenation, and extreme UV/chemical resilience.",
    features: [
      "9H multi-layer protective liquid quartz armor",
      "Multi-stage machine paint correction step",
      "Self-cleaning extreme hydrophobic properties",
      "Scratches and chemical etching protection",
      "Up to 3-5 years warranty alignment"
    ],
    icon: "ShieldAlert",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "interior-detailing",
    name: "Signature Interior Detailing",
    duration: "4 - 6 Hours",
    price: "₹4,499",
    description: "Complete cabin rehabilitation. Vapor steam sanitization of all surfaces, leather conditioning/feeding, deep extraction, and odor removal treatments.",
    features: [
      "Thermal vapor steam extraction & disinfection",
      "Premium leather feeding, mat restoration",
      "Alcantara / suede delicate agitation",
      "Deep upholstery carpet washing & extraction",
      "Ozone active odor remediation therapy"
    ],
    icon: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "engine-cleaning",
    name: "Engine Bay Tech Bay",
    duration: "2 Hours",
    price: "₹1,999",
    description: "Safe, precision dry steam and safe solvent cleaning of engine compartment. Seals, rubber pipes condition dressings, and technical panel protection.",
    features: [
      "Dry steam low-moisture decontamination",
      "Professional grease and carbon dissolve formula",
      "Safe electrical module wrapping insulation",
      "Anti-rodent repellant protective coating",
      "Satin engine trim restoration shield"
    ],
    icon: "Cpu",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "paint-protection",
    name: "Paint Protection Film (PPF)",
    duration: "3 - 4 Days",
    price: "₹65,000",
    description: "Self-healing thermoplastic polyurethane (TPU) transparent film. Peak defense against gravel rock chips, deep key scratches, and daily road debris wear.",
    features: [
      "Premium Ultra TPU self-healing clear film",
      "Computer-cut precise custom vehicle templates",
      "Optical clarity mirror gloss finishes",
      "Anti-yellowing UV barrier filter warranty",
      "Elite defense against rock chips & scratches"
    ],
    icon: "Layers",
    image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&q=80&w=800"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    url: "https://res.cloudinary.com/dvikvluu9/image/upload/v1779972239/A9_taqxav.jpg",
    title: "Aston Martin Superleggera",
    subtitle: "Full multi-stage paint correction with Nano Ceramic Coating treatment.",
    category: "Ceramic Coating"
  },
  {
    id: "g2",
    url: "https://res.cloudinary.com/dvikvluu9/image/upload/v1779972239/A7_f4w8co.jpg",
    title: "Porsche GT3 RS Edition",
    subtitle: "Stealth matte Ultra TPU self-healing Paint Protection Film (PPF) application.",
    category: "PPF Armor"
  },
  {
    id: "g3",
    url: "https://res.cloudinary.com/dvikvluu9/image/upload/v1779972240/A8_q6pksk.jpg",
    title: "BMW M8 Competition Shadow",
    subtitle: "Deep cabin revitalization, full leather treatment, and steam sanitization.",
    category: "Interior Detailing"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Arjun Nair",
    role: "Supercar Enthusiast",
    vehicle: "Porsche 911 Carrera S",
    text: "The gloss level on my 911 after Auto Hospice's Nano Ceramic treatment is absolutely insane! Wet-reflective shine of another dimension. Their attention to minor areas, wheel wells, exhaust tips, is pure craftsmanship.",
    rating: 5
  },
  {
    id: "t2",
    name: "Meera Krishnan",
    role: "Regular detailing Client",
    vehicle: "Mercedes GLE 400d Coupe",
    text: "With kids, keeping a beige leather GLE interior is a nightmare. Auto Hospice worked their signature steam clean extraction on my seats, and they look brand clean and smell amazing. Simply flawless customer care.",
    rating: 5
  },
  {
    id: "t3",
    name: "Sanjay Sundaram",
    role: "Collector",
    vehicle: "Audi RS e-tron GT",
    text: "Brought my brand new e-tron GT for full body TPU self-healing PPF. The template fitting is spot-on, completely seamless, impossible to see. Definitely the elite automotive protection studio in Tamil Nadu.",
    rating: 5
  }
];
