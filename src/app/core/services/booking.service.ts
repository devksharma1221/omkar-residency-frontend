import { Injectable } from '@angular/core';
import { BookingAddOns, BookingConfirmation, BookingRequest, PriceSummary } from '../models/booking.model';
import { Room } from '../models/room.model';
import { nightsBetween } from '../utils/date';

export const ADD_ON_PRICES = {
  /** Per guest, per night. */
  breakfast: 650,
  /** Flat fee per booking (round trip). */
  airportTransfer: 1800,
} as const;

/** GST on hotel accommodation: 5% up to ₹7,500 per night, 18% above. */
const GST_THRESHOLD = 7500;
const GST_LOW = 0.05;
const GST_HIGH = 0.18;

@Injectable({ providedIn: 'root' })
export class BookingService {
  calculate(
    room: Room | undefined,
    checkIn: string | null | undefined,
    checkOut: string | null | undefined,
    guests: number,
    addOns: BookingAddOns,
  ): PriceSummary {
    const nights = nightsBetween(checkIn, checkOut);
    if (!room || nights === 0) {
      return { nights, roomTotal: 0, addOnsTotal: 0, taxRate: 0, taxes: 0, grandTotal: 0 };
    }

    const roomTotal = room.pricePerNight * nights;
    const addOnsTotal =
      (addOns.breakfast && !room.amenities.includes('breakfast')
        ? ADD_ON_PRICES.breakfast * guests * nights
        : 0) + (addOns.airportTransfer ? ADD_ON_PRICES.airportTransfer : 0);
    const taxRate = room.pricePerNight > GST_THRESHOLD ? GST_HIGH : GST_LOW;
    const taxes = Math.round((roomTotal + addOnsTotal) * taxRate);

    return { nights, roomTotal, addOnsTotal, taxRate, taxes, grandTotal: roomTotal + addOnsTotal + taxes };
  }

  /** Mock submission — returns a confirmation after a short simulated network delay. */
  submit(request: BookingRequest, summary: PriceSummary): Promise<BookingConfirmation> {
    const reference = `OMR-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    return new Promise((resolve) => setTimeout(() => resolve({ reference, request, summary }), 900));
  }
}
