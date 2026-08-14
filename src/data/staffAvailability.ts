import type { StaffAvailability } from "../types/staff";

export const staffAvailability: StaffAvailability[] = [
  {
    id: "availability-1",
    propertyId: "property-1",
    staffId: "staff-2",
    date: "2026-08-18",
    status: "available",
    availableFrom: "09:00",
    availableUntil: "15:00",
  },
  {
    id: "availability-2",
    propertyId: "property-1",
    staffId: "staff-3",
    date: "2026-08-18",
    status: "unavailable",
    availableFrom: null,
    availableUntil: null,
  },
  {
    id: "availability-3",
    propertyId: "property-1",
    staffId: "staff-4",
    date: "2026-08-18",
    status: "available",
    availableFrom: "14:00",
    availableUntil: "20:00",
  },
];