import { useState } from "react";
import { cleaningTasks } from "../data/cleaningTasks";
import type {
  CleaningStatus,
  CleaningTask,
} from "../types/cleaning";
import CleaningTaskCard from "../features/cleaning/components/CleaningTaskCard";

const CleaningPage = () => {
  const [taskList, setTaskList] =
    useState<CleaningTask[]>(cleaningTasks);

  const handleStatusChange = (
    taskId: string,
    status: CleaningStatus,
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
          ? { ...task, assignedStaffId: staffId }
          : task,
      ),
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Cleaning
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage room cleaning tasks
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {taskList.map((task) => (
          <CleaningTaskCard
            key={task.id}
            task={task}
            onStatusChange={handleStatusChange}
            onStaffChange={handleStaffChange}
          />
        ))}
      </div>
    </div>
  );
};

export default CleaningPage;