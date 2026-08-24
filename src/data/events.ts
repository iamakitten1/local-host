import type { Event } from "../types/event";

export const events: Event[] = [
  {
    id: "event-1",
    propertyId: "property-1",

    title: "Birthday Party",

    date: "2026-08-22",
    startTime: "18:00",
    endTime: "23:00",

    area: "garden",
    instructions:
      "Arrive one hour earlier and prepare the tables before guests arrive.",

    requiredStaffCount: 3,

    status: "scheduled",

    createdByStaffId: "staff-owner",
    createdAt: "2026-08-16T09:00:00",
  },
];