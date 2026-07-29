import type { Bed } from "./room";

export type BookingStatus =
  | "confirmed"
  | "checked-in"
  | "checked-out"
  | "cancelled";

export type Booking = {
  id: string;
  propertyId: string;
  roomId: string;
  guestName: string;
  guestCount: number;
  checkInDate: string;
  estimatedArrivalTime: string | null;
  checkOutDate: string;
  status: BookingStatus;

  // კონკრეტულად ამ booking-ზე რა საწოლები უნდა მომზადდეს
  selectedBeds: Bed[];
};