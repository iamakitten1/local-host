import type { Assignment } from "../types/assignment";

export const assignments: Assignment[] = [
  {
    id: "assignment-1",
    propertyId: "property-1",

    sourceType: "event",
    sourceId: "event-1",

    staffId: "staff-2",

    status: "confirmed",

    assignedByStaffId: "staff-owner",
    assignedAt: "2026-08-16T09:05:00",

    respondedAt: "2026-08-16T10:00:00",
  },
  {
    id: "assignment-2",
    propertyId: "property-1",

    sourceType: "event",
    sourceId: "event-1",

    staffId: "staff-4",

    status: "pending",

    assignedByStaffId: "staff-owner",
    assignedAt: "2026-08-16T09:06:00",
  },
  {
    id: "assignment-3",
    propertyId: "property-1",
  
    sourceType: "work-task",
    sourceId: "task-1",
  
    staffId: "staff-3",
  
    status: "confirmed",
  
    assignedByStaffId: "staff-1",
    assignedAt: "2026-08-20T09:00:00",
  
    respondedAt: "2026-08-20T09:20:00",
  },
  {
    id: "assignment-4",
    propertyId: "property-1",
  
    sourceType: "work-task",
    sourceId: "task-4",
  
    staffId: "staff-4",
  
    status: "pending",
  
    assignedByStaffId: "staff-1",
    assignedAt: "2026-08-20T09:10:00",
  },
  {
    id: "assignment-5",
    propertyId: "property-1",
  
    sourceType: "work-task",
    sourceId: "task-5",
  
    staffId: "staff-3",
  
    status: "confirmed",
  
    assignedByStaffId: "staff-1",
    assignedAt: "2026-08-20T09:15:00",
  
    respondedAt: "2026-08-20T09:30:00",
  },
];