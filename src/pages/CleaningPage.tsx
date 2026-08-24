import { useState } from "react";

import { workTasks } from "../data/workTasks";
import { assignments } from "../data/assignments";

import CleaningTaskCard from "../features/cleaning/components/CleaningTaskCard";
import AddCleaningTaskModal from "../features/cleaning/components/AddCleaningTaskModal";
import EditCleaningTaskModal from "../features/cleaning/components/EditCleaningTaskModal";

import type {
  WorkTask,
  WorkTaskStatus,
} from "../types/workTask";
import type { Assignment } from "../types/assignment";

type CleaningFilter =
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

const CleaningPage = () => {
  const [taskList, setTaskList] =
    useState<WorkTask[]>(
      workTasks.filter(
        (task) =>
          task.type ===
          "room-cleaning",
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

  const [
    isAddTaskOpen,
    setIsAddTaskOpen,
  ] = useState(false);

  const [editingTask, setEditingTask] =
    useState<WorkTask | null>(null);

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

  return (
    <div className="min-w-0">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Cleaning
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage delegated cleaning
            tasks
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsAddTaskOpen(true)
          }
          className="w-full shrink-0 cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto"
        >
          + Add Task
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            setFilter("today")
          }
          className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium ${
            filter === "today"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          Today
        </button>

        <button
          type="button"
          onClick={() =>
            setFilter("upcoming")
          }
          className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium ${
            filter === "upcoming"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          Upcoming
        </button>

        <button
          type="button"
          onClick={() =>
            setFilter("completed")
          }
          className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium ${
            filter === "completed"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          Completed
        </button>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-2">
        {filteredTasks.map((task) => {
          const assignment =
            assignmentList.find(
              (assignment) =>
                assignment.sourceType ===
                  "work-task" &&
                assignment.sourceId ===
                  task.id,
            );

          return (
            <CleaningTaskCard
              key={task.id}
              task={task}
              assignment={
                assignment
              }
              onStatusChange={
                handleStatusChange
              }
              onStaffChange={
                handleStaffChange
              }
              onDelete={
                handleDeleteTask
              }
              onEdit={setEditingTask}
            />
          );
        })}
      </div>

      {isAddTaskOpen && (
        <AddCleaningTaskModal
          onClose={() =>
            setIsAddTaskOpen(false)
          }
          onAddTask={
            handleAddTask
          }
        />
      )}

      {editingTask && (
        <EditCleaningTaskModal
          task={editingTask}
          assignment={assignmentList.find(
            (assignment) =>
              assignment.sourceType ===
                "work-task" &&
              assignment.sourceId ===
                editingTask.id,
          )}
          onClose={() =>
            setEditingTask(null)
          }
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default CleaningPage;