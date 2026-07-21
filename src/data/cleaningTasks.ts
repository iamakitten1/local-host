import type { CleaningTask } from "../types/cleaning";

export const cleaningTasks: CleaningTask[] = [
  {
    id: "cleaning-1",
    propertyId: "property-1",
    roomId: "room-blue",
    bookingId: "booking-2",
    assignedStaffId: "staff-2",
    scheduledDate: "2026-07-22",
    status: "completed",
  },
  {
    id: "cleaning-2",
    propertyId: "property-1",
    roomId: "room-orange",
    bookingId: "booking-5",
    assignedStaffId: "staff-3",
    scheduledDate: "2026-07-23",
    status: "pending",
  },
  {
    id: "cleaning-3",
    propertyId: "property-1",
    roomId: "room-red",
    bookingId: "booking-8",
    assignedStaffId: "staff-4",
    scheduledDate: "2026-07-23",
    status: "in-progress",
  },
  {
    id: "cleaning-4",
    propertyId: "property-1",
    roomId: "room-blue",
    bookingId: "booking-3",
    assignedStaffId: null,
    scheduledDate: "2026-07-26",
    status: "pending",
  },
];