export interface PriceSummary {
  nights: number;
  roomTotal: number;
  addOnsTotal: number;
  taxRate: number;
  taxes: number;
  grandTotal: number;
}

export interface BookingAddOns {
  breakfast: boolean;
  airportTransfer: boolean;
}

export interface BookingRequest {
  roomId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  addOns: BookingAddOns;
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests: string;
  };
}

export interface BookingConfirmation {
  reference: string;
  request: BookingRequest;
  summary: PriceSummary;
}
