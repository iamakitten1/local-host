export type CleaningStatus =
  | "pending"
  | "in-progress"
  | "completed";

export type CleaningTask = {
  id: string;
  propertyId: string;
  roomId: string;
  bookingId: string | null;
  assignedStaffId: string | null;
  scheduledDate: string;
  status: CleaningStatus;
};