export type WorkSessionStatus =
  | "not-started"
  | "in-progress"
  | "on-break"
  | "completed";

export type WorkSession = {
  id: string;
  propertyId: string;

  taskId: string;
  staffId: string;

  startedAt: string | null;
  finishedAt: string | null;

  breakMinutes: number;

  hourlyRate: number;
  earnedAmount: number;

  status: WorkSessionStatus;
};