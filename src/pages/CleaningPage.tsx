import { useState } from "react";

import CleaningTaskCard from "../features/cleaning/components/CleaningTaskCard";
import AddCleaningTaskModal from "../features/cleaning/components/AddCleaningTaskModal";
import EditCleaningTaskModal from "../features/cleaning/components/EditCleaningTaskModal";

import useCleaningTasks from "../features/cleaning/hooks/useCleaningTasks";

import type { WorkTask } from "../types/workTask";

const CleaningPage = () => {
  const {
    filteredTasks,
    assignmentList,
    filter,
    setFilter,
    handleStatusChange,
    handleStaffChange,
    handleAddTask,
    handleSaveTask,
    handleDeleteTask,
  } = useCleaningTasks();

  const [
    isAddTaskOpen,
    setIsAddTaskOpen,
  ] = useState(false);

  const [
    editingTask,
    setEditingTask,
  ] = useState<WorkTask | null>(null);

  return (
    <div className="min-w-0">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Cleaning
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage delegated cleaning tasks
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

      {/* Filters */}
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

      {/* Tasks */}
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
              assignment={assignment}
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

      {/* Add modal */}
      {isAddTaskOpen && (
        <AddCleaningTaskModal
          onClose={() =>
            setIsAddTaskOpen(false)
          }
          onAddTask={handleAddTask}
        />
      )}

      {/* Edit modal */}
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