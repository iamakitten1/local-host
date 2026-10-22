import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";

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

  const [isAddTaskOpen, setIsAddTaskOpen] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState<WorkTask | null>(null);

  const filters = [
    { label: "Today", value: "today" as const },
    { label: "Upcoming", value: "upcoming" as const },
    { label: "Completed", value: "completed" as const },
  ];

  return (
    <div className="min-w-0 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
            Operations
          </p>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-(--color-primary-soft) text-(--color-primary)">
              <Sparkles
                size={19}
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-(--color-text) sm:text-3xl">
                Cleaning
              </h1>

              <p className="mt-1 text-sm text-(--color-text-muted)">
                Manage delegated cleaning tasks and assignments.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsAddTaskOpen(true)}
          className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) sm:w-auto"
        >
          <Plus
            size={17}
            strokeWidth={2}
            aria-hidden="true"
          />
          Add Task
        </button>
      </div>

      <div className="flex flex-wrap gap-2 rounded-2xl border border-(--color-border) bg-(--color-surface) p-2 shadow-sm">
        {filters.map((item) => {
          const isActive = filter === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-(--color-primary-soft) text-(--color-primary)"
                  : "text-(--color-text-muted) hover:bg-(--color-surface-soft) hover:text-(--color-text)"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {filteredTasks.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-(--color-border)] bg-(--color-surface) p-10 text-center">
          <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-(--color-primary-soft) text-(--color-primary)">
            <Sparkles
              size={20}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </div>

          <p className="mt-4 text-sm font-semibold text-(--color-text)">
            No cleaning tasks here
          </p>

          <p className="mt-1 text-sm text-(--color-text-muted)">
            Tasks matching this filter will appear here.
          </p>
        </div>
      ) : (
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
                onDelete={handleDeleteTask}
                onEdit={setEditingTask}
              />
            );
          })}
        </div>
      )}

      {isAddTaskOpen && (
        <AddCleaningTaskModal
          onClose={() =>
            setIsAddTaskOpen(false)
          }
          onAddTask={handleAddTask}
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