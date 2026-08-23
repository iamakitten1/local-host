import type { WorkTask } from "../types/workTask";

export const workTasks: WorkTask[] = [
  {
    id: "task-1",
    propertyId: "property-1",
    type: "room-cleaning",
    title: "Clean Room Blue",
    instructions: "Check towels and leave extra water.",
    date: "2026-08-28",
    startTime: "11:00",
  
    roomId: "room-blue",
    bookingId: "booking-3",
    status: "pending",
    priority: "normal",
    createdByStaffId: "staff-1",
    createdAt: "2026-08-16T09:00:00",
  },
  
  {
    id: "task-4",
    propertyId: "property-1",
    type: "event-cleaning",
    title: "Post-event cleanup",
    instructions: "Clean the garden and tavern after the party.",
    date: "2026-08-22",
    startTime: "18:30",
    
    area: "garden",
    status: "pending",
    priority: "normal",
    createdByStaffId: "staff-1",
    createdAt: "2026-08-16T09:20:00",
  },
  {
    id: "task-5",
    propertyId: "property-1",
    type: "property-cleaning",
    title: "Clean common areas",
    instructions: "Clean reception, kitchen and tavern.",
    date: "2026-08-23",
    startTime: "09:00",
    
    area: "common-areas",
    status: "pending",
    priority: "normal",
    createdByStaffId: "staff-1",
    createdAt: "2026-08-16T09:30:00",
  },
];