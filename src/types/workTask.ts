export type WorkTaskType =
  | "room-cleaning"
  | "property-cleaning"
  | "event-setup"
  | "event-work"
  | "event-cleaning"
  | "maintenance"
  | "other";

export type WorkTaskStatus =
  | "pending"
  | "in-progress"
  | "completed"
  | "cancelled";

export type WorkTaskPriority =
  | "normal"
  | "important"
  | "urgent";

export type WorkTask = {
  id: string;
  propertyId: string;

  type: WorkTaskType;

  title: string;
  instructions?: string;

  date: string;
  startTime?: string;

  assignedStaffIds: string[];

  roomId?: string;
  eventId?: string;

  area?: string;

  status: WorkTaskStatus;
  priority: WorkTaskPriority;

  createdByStaffId: string;
  createdAt: string;

  completedAt?: string;
  completedByStaffId?: string;
};