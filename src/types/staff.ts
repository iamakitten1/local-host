export type StaffRole = "owner" | "manager" | "staff";

export type Staff = {
  id: string;
  propertyId: string;

  firstName: string;
  lastName: string;

  email: string;
  phone?: string;

  role: StaffRole;

  isActive: boolean;
};


export type AvailabilityStatus =
  | "available"
  | "unavailable";

export type StaffAvailability = {
  id: string;
  propertyId: string;
  staffId: string;

  date: string;

  status: AvailabilityStatus;

  availableFrom: string | null;
  availableUntil: string | null;

  note?: string;
};

export type ShiftStatus =
  | "scheduled"
  | "in-progress"
  | "completed"
  | "cancelled";

export type StaffShift = {
  id: string;
  propertyId: string;
  staffId: string;

  date: string;

  scheduledStartTime: string;

  actualStartTime: string | null;
  actualEndTime: string | null;

  breakMinutes: number;

  status: ShiftStatus;

  note?: string;
};