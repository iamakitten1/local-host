export type AssignmentStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "cancellation-requested"
  | "cancelled";

export type AssignmentSourceType =
  | "work-task"
  | "event";

export type Assignment = {
  id: string;
  propertyId: string;

  sourceType: AssignmentSourceType;
  sourceId: string;

  staffId: string;

  status: AssignmentStatus;

  assignedByStaffId: string;
  assignedAt: string;

  respondedAt?: string;
  declineReason?: string;

  cancellationRequestedAt?: string;
  cancellationReason?: string;

  cancelledAt?: string;
};