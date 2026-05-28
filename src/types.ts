export interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
  features: string[];
  icon: string; // lucide icon name
  image: string; // background image for detailing card
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  subtitle: string;
  category: string;
}

export interface BookingState {
  name: string;
  phone: string;
  vehicleType: string;
  vehicleModel: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  vehicle: string;
  text: string;
  rating: number;
}
