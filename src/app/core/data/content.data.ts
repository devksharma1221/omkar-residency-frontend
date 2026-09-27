import { Amenity, GalleryImage, Testimonial } from '../models/content.model';
import { unsplash } from '../utils/image';

export const HOTEL_INFO = {
  name: 'Omkar Residency',
  tagline: 'Where heritage hospitality meets modern luxury',
  address: ['Plot 14, Gangapur Road', 'Nashik, Maharashtra 422013', 'India'],
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  email: 'reservations@omkarresidency.in',
  checkInTime: '2:00 PM',
  checkOutTime: '11:00 AM',
};

export const HERO_IMAGE = unsplash('1542314831-068cd1dbfeeb', 2000);

export const HOTEL_AMENITIES: Amenity[] = [
  {
    icon: 'waves',
    title: 'Infinity Pool',
    description: 'A temperature-controlled pool with a sun deck and poolside cabanas.',
  },
  {
    icon: 'utensils',
    title: 'Saffron Restaurant',
    description: 'All-day dining celebrating regional Maharashtrian and pan-Indian flavours.',
  },
  {
    icon: 'sparkles',
    title: 'Ananda Spa',
    description: 'Ayurvedic therapies, massages and rituals by certified therapists.',
  },
  {
    icon: 'dumbbell',
    title: 'Fitness Studio',
    description: 'A 24-hour studio with modern equipment and morning yoga sessions.',
  },
  {
    icon: 'car',
    title: 'Airport Transfers',
    description: 'Chauffeured pick-up and drop in comfortable, sanitised sedans.',
  },
  {
    icon: 'bell',
    title: '24/7 Concierge',
    description: 'Curated city tours, vineyard visits and temple darshan arrangements.',
  },
  {
    icon: 'wifi',
    title: 'Complimentary Wi-Fi',
    description: 'Fast, secure connectivity across every room and public space.',
  },
  {
    icon: 'briefcase',
    title: 'Banquets & Events',
    description: 'Elegant venues for weddings, conferences and private celebrations.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Ananya Deshpande',
    location: 'Pune',
    quote:
      'From the warm welcome with aarti and marigolds to the spotless suite, every detail felt personal. The Saffron breakfast spread alone is worth the trip.',
    rating: 5,
    stay: 'Junior Suite · Anniversary stay',
  },
  {
    name: 'Rahul Mehta',
    location: 'Mumbai',
    quote:
      'I travel to Nashik every month for work and Omkar Residency has become my home here. Quiet rooms, fast Wi-Fi and a lounge that actually feels exclusive.',
    rating: 5,
    stay: 'Executive Room · Business travel',
  },
  {
    name: 'Priya & Karthik Iyer',
    location: 'Bengaluru',
    quote:
      'Our kids loved the pool and the activity kit, and we loved the calm. The staff arranged a vineyard tour that became the highlight of our holiday.',
    rating: 5,
    stay: 'Family Suite · Family holiday',
  },
  {
    name: 'Sarah Thompson',
    location: 'London, UK',
    quote:
      'A beautiful blend of Indian warmth and international polish. The Ananda Spa massage was exceptional and the concierge team thought of everything.',
    rating: 4,
    stay: 'Premium Deluxe Room · Leisure',
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: unsplash('1542314831-068cd1dbfeeb'), alt: 'Omkar Residency facade and pool at dusk', category: 'Property', tall: true },
  { src: unsplash('1631049307264-da0ec9d70304'), alt: 'Deluxe room with king bed', category: 'Rooms' },
  { src: unsplash('1414235077428-338989a2e8c0'), alt: 'Fine dining table setting at Saffron', category: 'Dining' },
  { src: unsplash('1544161515-4ab6ce6db874'), alt: 'Ayurvedic massage at Ananda Spa', category: 'Wellness' },
  { src: unsplash('1578683010236-d716f9a3f461'), alt: 'Presidential Suite living area', category: 'Rooms', tall: true },
  { src: unsplash('1576013551627-0cc20b96c2a7'), alt: 'Garden pool surrounded by greenery', category: 'Property' },
  { src: unsplash('1590490360182-c33d57733427'), alt: 'Executive room with lounge seating', category: 'Rooms' },
  { src: unsplash('1517248135467-4c7edcad34c4'), alt: 'Saffron restaurant interiors', category: 'Dining', tall: true },
  { src: unsplash('1564501049412-61c2a3083791'), alt: 'Poolside view of the hotel at twilight', category: 'Property' },
  { src: unsplash('1571902943202-507ec2618e8f'), alt: 'Fitness studio', category: 'Wellness' },
  { src: unsplash('1618773928121-c32242e63f39'), alt: 'Premium deluxe room with garden view', category: 'Rooms' },
  { src: unsplash('1584132967334-10e028bd69f7'), alt: 'Pool deck with loungers', category: 'Wellness', tall: true },
  { src: unsplash('1595576508898-0ad5c879a061'), alt: 'Family suite with twin beds', category: 'Rooms' },
  { src: unsplash('1571896349842-33c89424de2d'), alt: 'Poolside pavilion lit up at night', category: 'Property' },
  { src: unsplash('1587985064135-0366536eab42'), alt: 'Junior suite bedroom', category: 'Rooms' },
  { src: unsplash('1600011689032-8b628b8a8747'), alt: 'Pool at sunset with palm trees', category: 'Property' },
];
