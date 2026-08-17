import { useState } from "react";
import { workTasks } from "../data/workTasks";
import CleaningTaskCard from "../features/cleaning/components/CleaningTaskCard";
import type {
  WorkTask,
  WorkTaskStatus,
} from "../types/workTask";
import AddCleaningTaskModal from "../features/cleaning/components/AddCleaningTaskModal";
import EditCleaningTaskModal from "../features/cleaning/components/EditCleaningTaskModal";

type CleaningFilter = "today" | "upcoming" | "completed";

const CleaningPage = () => {
  const [taskList, setTaskList] = useState<WorkTask[]>(
    workTasks.filter((task) => task.type === "room-cleaning"),
  );

  const [filter, setFilter] = useState<CleaningFilter>("today");

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const [editingTask, setEditingTask] =
    useState<WorkTask | null>(null);

  const today = "2026-07-22";

  const handleStatusChange = (
    taskId: string,
    status: WorkTaskStatus,
  ) => {
    setTaskList((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, status }
          : task,
      ),
    );
  };

  const handleStaffChange = (
    taskId: string,
    staffId: string | null,
  ) => {
    setTaskList((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              assignedStaffIds: staffId ? [staffId] : [],
            }
          : task,
      ),
    );
  };

  const handleAddTask = (task: WorkTask) => {
    setTaskList((currentTasks) => [
      ...currentTasks,
      task,
    ]);
  };

  const handleSaveTask = (updatedTask: WorkTask) => {
    setTaskList((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task,
      ),
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTaskList((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== taskId,
      ),
    );
  };

  const filteredTasks = taskList.filter((task) => {
    if (filter === "completed") {
      return task.status === "completed";
    }

    if (filter === "today") {
      return (
        task.date === today &&
        task.status !== "completed"
      );
    }

    return (
      task.date > today &&
      task.status !== "completed"
    );
  });

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Cleaning
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage room cleaning tasks
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddTaskOpen(true)}
          className="w-full cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto"
        >
          + Add Task
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("today")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            filter === "today"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          Today
        </button>

        <button
          type="button"
          onClick={() => setFilter("upcoming")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            filter === "upcoming"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          Upcoming
        </button>

        <button
          type="button"
          onClick={() => setFilter("completed")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            filter === "completed"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          Completed
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {filteredTasks.map((task) => (
          <CleaningTaskCard
            key={task.id}
            task={task}
            onStatusChange={handleStatusChange}
            onStaffChange={handleStaffChange}
            onDelete={handleDeleteTask}
            onEdit={setEditingTask}
          />
        ))}
      </div>

      {isAddTaskOpen && (
        <AddCleaningTaskModal
          onClose={() => setIsAddTaskOpen(false)}
          onAddTask={handleAddTask}
        />
      )}

      {editingTask && (
        <EditCleaningTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default CleaningPage;