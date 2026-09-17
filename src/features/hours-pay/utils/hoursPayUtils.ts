import type { WorkSession } from "../../../types/workSession";
import type { HoursPayPeriod } from "../types";

export const getWorkedMinutes = (
  session: WorkSession,
) => {
  if (
    !session.startedAt ||
    !session.finishedAt
  ) {
    return 0;
  }

  const startedAt = new Date(
    session.startedAt,
  );

  const finishedAt = new Date(
    session.finishedAt,
  );

  return Math.max(
    0,
    Math.floor(
      (finishedAt.getTime() -
        startedAt.getTime()) /
        60000,
    ) - session.breakMinutes,
  );
};

export const formatMinutes = (
  totalMinutes: number,
) => {
  const hours = Math.floor(
    totalMinutes / 60,
  );

  const minutes =
    totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
};

export const formatDate = (
  date: string,
) =>
  new Date(
    `${date}T00:00:00`,
  ).toLocaleDateString();

const getStartOfWeek = (
  date: Date,
) => {
  const start = new Date(date);

  const day = start.getDay();

  const diff =
    day === 0
      ? -6
      : 1 - day;

  start.setDate(
    start.getDate() + diff,
  );

  start.setHours(0, 0, 0, 0);

  return start;
};

const getStartOfMonth = (
  date: Date,
) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    1,
  );

export const isDateInPeriod = (
  date: Date,
  period: HoursPayPeriod,
) => {
  if (period === "all") {
    return true;
  }

  const now = new Date();

  if (period === "week") {
    return (
      date >= getStartOfWeek(now)
    );
  }

  return (
    date >= getStartOfMonth(now)
  );
};