import type { Booking } from "../types/booking";

export const bookings: Booking[] = [
  // ROOM BLUE — capacity: 2

  {
    id: "booking-1",
    propertyId: "property-1",
    roomId: "room-blue",
    guestName: "Marco Rossi",
    guestCount: 2,
    checkInDate: "2026-07-18",
    estimatedArrivalTime: "15:30",
    checkOutDate: "2026-07-21",
    status: "checked-out",
  },

  {
    id: "booking-2",
    propertyId: "property-1",
    roomId: "room-blue",
    guestName: "Anna Bianchi",
    guestCount: 1,
    checkInDate: "2026-07-22",
    estimatedArrivalTime: "14:00",
    checkOutDate: "2026-07-25",
    status: "confirmed",
  },

  {
    id: "booking-3",
    propertyId: "property-1",
    roomId: "room-blue",
    guestName: "Andrea Romano",
    guestCount: 2,
    checkInDate: "2026-07-26",
    estimatedArrivalTime: null,
    checkOutDate: "2026-07-29",
    status: "confirmed",
  },

  // ROOM ORANGE — capacity: 3

  {
    id: "booking-4",
    propertyId: "property-1",
    roomId: "room-orange",
    guestName: "Giulia Esposito",
    guestCount: 2,
    checkInDate: "2026-07-19",
    estimatedArrivalTime: "17:00",
    checkOutDate: "2026-07-22",
    status: "checked-in",
  },

  {
    id: "booking-5",
    propertyId: "property-1",
    roomId: "room-orange",
    guestName: "Matteo Ricci",
    guestCount: 3,
    checkInDate: "2026-07-23",
    estimatedArrivalTime: "18:30",
    checkOutDate: "2026-07-27",
    status: "confirmed",
  },

  {
    id: "booking-6",
    propertyId: "property-1",
    roomId: "room-orange",
    guestName: "Elena Ferrari",
    guestCount: 1,
    checkInDate: "2026-07-28",
    estimatedArrivalTime: "13:00",
    checkOutDate: "2026-07-30",
    status: "confirmed",
  },

  // ROOM RED — capacity: 4

  {
    id: "booking-7",
    propertyId: "property-1",
    roomId: "room-red",
    guestName: "Luca Romano",
    guestCount: 4,
    checkInDate: "2026-07-18",
    estimatedArrivalTime: "16:00",
    checkOutDate: "2026-07-22",
    status: "checked-in",
  },

  {
    id: "booking-8",
    propertyId: "property-1",
    roomId: "room-red",
    guestName: "Maria Rossi",
    guestCount: 3,
    checkInDate: "2026-07-23",
    estimatedArrivalTime: null,
    checkOutDate: "2026-07-26",
    status: "confirmed",
  },

  {
    id: "booking-9",
    propertyId: "property-1",
    roomId: "room-red",
    guestName: "Paolo Conti",
    guestCount: 2,
    checkInDate: "2026-07-27",
    estimatedArrivalTime: "19:00",
    checkOutDate: "2026-07-30",
    status: "confirmed",
  },
];