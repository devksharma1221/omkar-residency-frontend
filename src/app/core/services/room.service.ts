import { Injectable } from '@angular/core';
import { ROOMS } from '../data/rooms.data';
import { Room, RoomCategory } from '../models/room.model';

/** Read-only access to the room catalogue. Backed by mock data until the API is available. */
@Injectable({ providedIn: 'root' })
export class RoomService {
  private readonly rooms: readonly Room[] = ROOMS;

  readonly categories: readonly RoomCategory[] = ['Deluxe', 'Executive', 'Family', 'Suite'];

  getAll(): readonly Room[] {
    return this.rooms;
  }

  getFeatured(): Room[] {
    return this.rooms.filter((room) => room.featured);
  }

  getBySlug(slug: string): Room | undefined {
    return this.rooms.find((room) => room.slug === slug);
  }

  getById(id: string): Room | undefined {
    return this.rooms.find((room) => room.id === id);
  }

  getSimilar(room: Room, limit = 3): Room[] {
    return this.rooms
      .filter((r) => r.id !== room.id)
      .sort(
        (a, b) =>
          Math.abs(a.pricePerNight - room.pricePerNight) - Math.abs(b.pricePerNight - room.pricePerNight),
      )
      .slice(0, limit);
  }

  get maxPrice(): number {
    return Math.max(...this.rooms.map((room) => room.pricePerNight));
  }
}
