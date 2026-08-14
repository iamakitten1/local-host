import type { StaffShift } from "../types/staff";

export const staffShifts: StaffShift[] = [
  {
    id: "shift-1",
    propertyId: "property-1",
    staffId: "staff-2",
    date: "2026-08-18",
    scheduledStartTime: "09:00",
    actualStartTime: null,
    actualEndTime: null,
    breakMinutes: 0,
    status: "scheduled",
  },
  {
    id: "shift-2",
    propertyId: "property-1",
    staffId: "staff-3",
    date: "2026-08-18",
    scheduledStartTime: "10:00",
    actualStartTime: "10:04",
    actualEndTime: null,
    breakMinutes: 15,
    status: "in-progress",
  },
  {
    id: "shift-3",
    propertyId: "property-1",
    staffId: "staff-4",
    date: "2026-08-17",
    scheduledStartTime: "09:00",
    actualStartTime: "09:02",
    actualEndTime: "14:26",
    breakMinutes: 20,
    status: "completed",
  },
];