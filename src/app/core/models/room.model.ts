export type RoomCategory = 'Deluxe' | 'Executive' | 'Suite' | 'Family';

export type AmenityKey =
  | 'wifi'
  | 'ac'
  | 'tv'
  | 'minibar'
  | 'bathtub'
  | 'room-service'
  | 'breakfast'
  | 'workspace'
  | 'lounge'
  | 'pool-view'
  | 'balcony'
  | 'butler';

export interface Room {
  id: string;
  slug: string;
  name: string;
  category: RoomCategory;
  tagline: string;
  description: string;
  highlights: string[];
  pricePerNight: number;
  originalPrice?: number;
  maxAdults: number;
  maxChildren: number;
  sizeSqFt: number;
  bed: string;
  view: string;
  images: string[];
  amenities: AmenityKey[];
  facilities: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
}
