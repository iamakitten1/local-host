export type BookingStatus =
  | "confirmed"
  | "checked-in"
  | "checked-out"
  | "cancelled";

export type Booking = {
  id: string;
  propertyId: string;
  roomId: string;
  guestId: string;
  guestCount: number;
  checkInDate: string;
  estimatedArrivalTime: string | null;
  checkOutDate: string;
  status: BookingStatus;
};