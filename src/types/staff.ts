export type StaffRole =
  | "owner"
  | "operations"
  | "staff";

export type StaffWorkType =
  | "cleaning"
  | "event";

export type Staff = {
  id: string;
  propertyId: string;

  firstName: string;
  lastName: string;
  email: string;
  phone?: string;

  role: StaffRole;
  workTypes: StaffWorkType[];

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