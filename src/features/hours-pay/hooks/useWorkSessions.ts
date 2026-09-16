import { useHoursPayContext } from "../context/HoursPayContext";
import { useWorkTasksContext } from "../../tasks/context/WorkTasksContext";

import type { WorkSession } from "../../../types/workSession";

const cleaningTaskTypes = [
  "room-cleaning",
  "property-cleaning",
  "event-cleaning",
] as const;

const useWorkSessions = () => {
  const {
    workSessionList,
    hourlyRateList,
    setWorkSessionList,
  } = useHoursPayContext();

  const {
    taskList,
    assignmentList,
    handleStatusChange,
  } = useWorkTasksContext();

  const getHourlyRate = (
    staffId: string,
    date = new Date(),
  ) => {
    const dateKey = date
      .toISOString()
      .slice(0, 10);

    const rates = hourlyRateList
      .filter(
        (rate) =>
          rate.staffId === staffId &&
          rate.effectiveFrom <= dateKey,
      )
      .sort((a, b) =>
        b.effectiveFrom.localeCompare(
          a.effectiveFrom,
        ),
      );

    return rates[0]?.hourlyRate ?? null;
  };

  const getWorkSession = (
    taskId: string,
    staffId: string,
  ) =>
    workSessionList.find(
      (session) =>
        session.taskId === taskId &&
        session.staffId === staffId,
    );

  const startWork = (
    taskId: string,
    staffId: string,
  ) => {
    const task = taskList.find(
      (task) => task.id === taskId,
    );

    if (!task) {
      return {
        success: false,
        error: "Task not found.",
      };
    }

    if (
      !cleaningTaskTypes.includes(
        task.type as
          (typeof cleaningTaskTypes)[number],
      )
    ) {
      return {
        success: false,
        error:
          "Time tracking is only available for cleaning tasks.",
      };
    }

    const assignment =
      assignmentList.find(
        (assignment) =>
          assignment.sourceType ===
            "work-task" &&
          assignment.sourceId === taskId &&
          assignment.staffId === staffId &&
          assignment.status ===
            "confirmed",
      );

    if (!assignment) {
      return {
        success: false,
        error:
          "This cleaning task is not confirmed for this staff member.",
      };
    }

    const existingSession =
      getWorkSession(taskId, staffId);

    if (existingSession) {
      return {
        success: false,
        error:
          "A work session already exists for this task.",
      };
    }

    const hourlyRate =
      getHourlyRate(staffId);

    if (hourlyRate === null) {
      return {
        success: false,
        error:
          "No hourly rate is set for this staff member.",
      };
    }

    const now =
      new Date().toISOString();

    const newSession: WorkSession = {
      id: `work-session-${Date.now()}`,
      propertyId: task.propertyId,
      taskId,
      staffId,
      startedAt: now,
      finishedAt: null,
      breakMinutes: 0,
      hourlyRate,
      earnedAmount: 0,
      status: "in-progress",
    };

    setWorkSessionList(
      (currentSessions) => [
        ...currentSessions,
        newSession,
      ],
    );

    handleStatusChange(
      taskId,
      "in-progress",
    );

    return {
      success: true,
      error: null,
    };
  };

  const finishWork = (
    taskId: string,
    staffId: string,
  ) => {
    const session =
      getWorkSession(taskId, staffId);

    if (
      !session ||
      session.status === "completed" ||
      !session.startedAt
    ) {
      return {
        success: false,
        error:
          "No active work session found.",
      };
    }

    const finishedAt = new Date();

    const startedAt = new Date(
      session.startedAt,
    );

    const totalMinutes = Math.max(
      0,
      Math.floor(
        (finishedAt.getTime() -
          startedAt.getTime()) /
          60000,
      ) - session.breakMinutes,
    );

    const earnedAmount =
      Math.round(
        ((totalMinutes / 60) *
          session.hourlyRate +
          Number.EPSILON) *
          100,
      ) / 100;

    setWorkSessionList(
      (currentSessions) =>
        currentSessions.map(
          (currentSession) =>
            currentSession.id ===
            session.id
              ? {
                  ...currentSession,
                  finishedAt:
                    finishedAt.toISOString(),
                  earnedAmount,
                  status: "completed",
                }
              : currentSession,
        ),
    );

    handleStatusChange(
      taskId,
      "completed",
    );

    return {
      success: true,
      error: null,
    };
  };

  return {
    workSessionList,
    getWorkSession,
    getHourlyRate,
    startWork,
    finishWork,
  };
};

export default useWorkSessions;