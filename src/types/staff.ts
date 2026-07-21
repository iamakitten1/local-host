export type StaffRole = "owner" | "manager" | "staff";

export type Staff = {
  id: string;
  propertyId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: StaffRole;
};