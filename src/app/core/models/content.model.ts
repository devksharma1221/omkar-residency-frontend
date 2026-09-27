import { IconName } from '../../shared/components/icon/icons';

export interface Amenity {
  icon: IconName;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
  stay: string;
}

export type GalleryCategory = 'Rooms' | 'Dining' | 'Wellness' | 'Property';

export interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
  tall?: boolean;
}
