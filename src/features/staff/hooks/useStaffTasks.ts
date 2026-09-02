import { useWorkTasksContext } from "../../tasks/context/WorkTasksContext";

import type { WorkTask } from "../../../types/workTask";
import type { Assignment } from "../../../types/assignment";

const useStaffTasks = () => {
  const {
    taskList,
    assignmentList,
    setTaskList,
    setAssignmentList,
  } = useWorkTasksContext();

  const handleSaveTask = (
    task: WorkTask,
    selectedStaffIds: string[],
  ) => {
    setTaskList((currentTasks) => {
      const taskExists = currentTasks.some(
        (currentTask) =>
          currentTask.id === task.id,
      );

      if (taskExists) {
        return currentTasks.map(
          (currentTask) =>
            currentTask.id === task.id
              ? task
              : currentTask,
        );
      }

      return [...currentTasks, task];
    });

    setAssignmentList(
      (currentAssignments) => {
        const taskAssignments =
          currentAssignments.filter(
            (assignment) =>
              assignment.sourceType ===
                "work-task" &&
              assignment.sourceId ===
                task.id,
          );

        const otherAssignments =
          currentAssignments.filter(
            (assignment) =>
              !(
                assignment.sourceType ===
                  "work-task" &&
                assignment.sourceId ===
                  task.id
              ),
          );

        const nextTaskAssignments =
          selectedStaffIds.map(
            (staffId) => {
              const existingAssignment =
                taskAssignments.find(
                  (assignment) =>
                    assignment.staffId ===
                    staffId,
                );

              if (existingAssignment) {
                return existingAssignment;
              }

              const newAssignment: Assignment =
                {
                  id: `assignment-${Date.now()}-${staffId}`,
                  propertyId:
                    task.propertyId,
                  sourceType:
                    "work-task",
                  sourceId: task.id,
                  staffId,
                  status: "pending",
                  assignedByStaffId:
                    task.createdByStaffId,
                  assignedAt:
                    new Date().toISOString(),
                };

              return newAssignment;
            },
          );

        return [
          ...otherAssignments,
          ...nextTaskAssignments,
        ];
      },
    );
  };

  const handleDeleteTask = (
    taskId: string,
  ) => {
    const shouldDelete =
      window.confirm(
        "Delete this task?",
      );

    if (!shouldDelete) {
      return;
    }

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

  const getTaskStaffIds = (
    taskId: string,
  ) =>
    assignmentList
      .filter(
        (assignment) =>
          assignment.sourceType ===
            "work-task" &&
          assignment.sourceId ===
            taskId &&
          assignment.status !==
            "cancelled",
      )
      .map(
        (assignment) =>
          assignment.staffId,
      );

  return {
    taskList,
    assignmentList,
    handleSaveTask,
    handleDeleteTask,
    getTaskStaffIds,
  };
};

export default useStaffTasks;