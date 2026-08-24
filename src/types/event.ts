export type EventStatus =
  | "scheduled"
  | "completed"
  | "cancelled";

export type Event = {
  id: string;
  propertyId: string;

  title: string;

  date: string;
  startTime: string;
  endTime: string;

  area?: string;
  instructions?: string;

  requiredStaffCount: number;

  status: EventStatus;

  createdByStaffId: string;
  createdAt: string;
};