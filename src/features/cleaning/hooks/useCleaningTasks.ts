import { useState } from "react";

import { workTasks } from "../../../data/workTasks";
import { assignments } from "../../../data/assignments";

import type {
  WorkTask,
  WorkTaskStatus,
} from "../../../types/workTask";
import type { Assignment } from "../../../types/assignment";

export type CleaningFilter =
  | "today"
  | "upcoming"
  | "completed";

const getTodayDateKey = () => {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(
    today.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const useCleaningTasks = () => {
  const [taskList, setTaskList] =
    useState<WorkTask[]>(
      workTasks.filter(
        (task) =>
          task.type === "room-cleaning",
      ),
    );

  const [
    assignmentList,
    setAssignmentList,
  ] = useState<Assignment[]>(
    assignments.filter(
      (assignment) =>
        assignment.sourceType ===
        "work-task",
    ),
  );

  const [filter, setFilter] =
    useState<CleaningFilter>("today");

  const today = getTodayDateKey();

  const handleStatusChange = (
    taskId: string,
    status: WorkTaskStatus,
  ) => {
    setTaskList((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status,
            }
          : task,
      ),
    );
  };

  const handleStaffChange = (
    taskId: string,
    staffId: string | null,
  ) => {
    setAssignmentList(
      (currentAssignments) => {
        const existingAssignment =
          currentAssignments.find(
            (assignment) =>
              assignment.sourceType ===
                "work-task" &&
              assignment.sourceId ===
                taskId,
          );

        if (!staffId) {
          return currentAssignments.filter(
            (assignment) =>
              !(
                assignment.sourceType ===
                  "work-task" &&
                assignment.sourceId ===
                  taskId
              ),
          );
        }

        if (existingAssignment) {
          return currentAssignments.map(
            (assignment) =>
              assignment.id ===
              existingAssignment.id
                ? {
                    ...assignment,
                    staffId,
                    status: "pending",
                    assignedByStaffId:
                      "staff-1",
                    assignedAt:
                      new Date().toISOString(),
                    respondedAt:
                      undefined,
                    declineReason:
                      undefined,
                    cancellationRequestedAt:
                      undefined,
                    cancellationReason:
                      undefined,
                    cancelledAt:
                      undefined,
                  }
                : assignment,
          );
        }

        const newAssignment: Assignment =
          {
            id: `assignment-${Date.now()}`,
            propertyId:
              "property-1",
            sourceType:
              "work-task",
            sourceId: taskId,
            staffId,
            status: "pending",
            assignedByStaffId:
              "staff-1",
            assignedAt:
              new Date().toISOString(),
          };

        return [
          ...currentAssignments,
          newAssignment,
        ];
      },
    );
  };

  const handleAddTask = (
    task: WorkTask,
    assignedStaffId: string | null,
  ) => {
    setTaskList((currentTasks) => [
      ...currentTasks,
      task,
    ]);

    if (!assignedStaffId) {
      return;
    }

    const newAssignment: Assignment =
      {
        id: `assignment-${Date.now()}`,
        propertyId: task.propertyId,
        sourceType: "work-task",
        sourceId: task.id,
        staffId: assignedStaffId,
        status: "pending",
        assignedByStaffId:
          task.createdByStaffId,
        assignedAt:
          new Date().toISOString(),
      };

    setAssignmentList(
      (currentAssignments) => [
        ...currentAssignments,
        newAssignment,
      ],
    );
  };

  const handleSaveTask = (
    updatedTask: WorkTask,
    assignedStaffId: string | null,
  ) => {
    setTaskList((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task,
      ),
    );

    const currentAssignment =
      assignmentList.find(
        (assignment) =>
          assignment.sourceType ===
            "work-task" &&
          assignment.sourceId ===
            updatedTask.id,
      );

    const currentStaffId =
      currentAssignment?.staffId ??
      null;

    if (
      currentStaffId !== assignedStaffId
    ) {
      handleStaffChange(
        updatedTask.id,
        assignedStaffId,
      );
    }
  };

  const handleDeleteTask = (
    taskId: string,
  ) => {
    setTaskList((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== taskId,
      ),
    );

    setAssignmentList(
      (currentAssignments) =>
        currentAssignments.filter(
          (assignment) =>
            !(
              assignment.sourceType ===
                "work-task" &&
              assignment.sourceId ===
                taskId
            ),
        ),
    );
  };

  const filteredTasks =
    taskList.filter((task) => {
      if (filter === "completed") {
        return (
          task.status === "completed"
        );
      }

      if (filter === "today") {
        return (
          task.date <= today &&
          task.status !== "completed" &&
          task.status !== "cancelled"
        );
      }

      return (
        task.date > today &&
        task.status !== "completed" &&
        task.status !== "cancelled"
      );
    });

  return {
    filteredTasks,
    assignmentList,

    filter,
    setFilter,

    handleStatusChange,
    handleStaffChange,
    handleAddTask,
    handleSaveTask,
    handleDeleteTask,
  };
};

export default useCleaningTasks;