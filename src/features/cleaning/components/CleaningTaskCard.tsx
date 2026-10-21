import { Pencil, Trash2 } from "lucide-react";

import { rooms } from "../../../data/rooms";
import { staff } from "../../../data/staff";

import type {
  WorkTask,
  WorkTaskStatus,
} from "../../../types/workTask";

import type { Assignment } from "../../../types/assignment";

type CleaningTaskCardProps = {
  task: WorkTask;

  assignment?: Assignment;

  onStatusChange: (
    taskId: string,
    status: WorkTaskStatus,
  ) => void;

  onStaffChange: (
    taskId: string,
    staffId: string | null,
  ) => void;

  onDelete: (taskId: string) => void;

  onEdit: (task: WorkTask) => void;
};

const getAssignmentLabel = (
  assignment?: Assignment,
) => {
  if (!assignment) {
    return "Unassigned";
  }

  switch (assignment.status) {
    case "pending":
      return "Pending confirmation";

    case "confirmed":
      return "Confirmed";

    case "declined":
      return "Declined";

    case "cancellation-requested":
      return "Cancellation requested";

    case "cancelled":
      return "Cancelled";
  }
};

const getAssignmentClasses = (
  assignment?: Assignment,
) => {
  if (!assignment) {
    return "bg-gray-100 text-gray-600";
  }

  switch (assignment.status) {
    case "confirmed":
      return "bg-green-100 text-green-700";

    case "declined":
    case "cancelled":
      return "bg-red-100 text-red-700";

    case "cancellation-requested":
      return "bg-orange-100 text-orange-700";

    case "pending":
      return "bg-amber-100 text-amber-700";
  }
};

const fieldClasses =
  "h-10 w-full min-w-0 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-primary-muted)] focus:ring-2 focus:ring-[var(--color-primary-muted)]/10";

const CleaningTaskCard = ({
  task,
  assignment,
  onStatusChange,
  onStaffChange,
  onDelete,
  onEdit,
}: CleaningTaskCardProps) => {
  const room = rooms.find(
    (room) => room.id === task.roomId,
  );

  const assignedStaff = assignment
    ? staff.find(
        (member) =>
          member.id === assignment.staffId,
      )
    : undefined;

  const assignedBy = assignment
    ? staff.find(
        (member) =>
          member.id ===
          assignment.assignedByStaffId,
      )
    : undefined;

  return (
    <article className="min-w-0 rounded-3xl border border-(--color-border) bg-(--color-surface) p-5 shadow-sm">
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
            Room cleaning
          </p>

          <h2 className="mt-1 text-lg font-semibold tracking-tight text-(--color-text)">
            {room?.name ?? task.title}
          </h2>

          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-(--color-text-muted)">
            <span>{task.date}</span>

            {task.startTime && (
              <span>{task.startTime}</span>
            )}
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${getAssignmentClasses(
            assignment,
          )}`}
        >
          {getAssignmentLabel(assignment)}
        </span>
      </div>

      {task.instructions && (
        <div className="mt-4 rounded-2xl border border-(--color-border) bg-(--color-surface-soft) p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
            Instructions
          </p>

          <p className="mt-2 text-sm leading-6 text-(--color-text-muted)">
            {task.instructions}
          </p>
        </div>
      )}

      <div className="mt-5 grid min-w-0 grid-cols-1 gap-4 border-t border-(--color-border) pt-5 md:grid-cols-2">
        <div className="min-w-0">
          <label
            htmlFor={`cleaner-${task.id}`}
            className="mb-1.5 block text-xs font-medium text-(--color-text-muted)"
          >
            Cleaner
          </label>

          <select
            id={`cleaner-${task.id}`}
            value={assignment?.staffId ?? ""}
            onChange={(event) =>
              onStaffChange(
                task.id,
                event.target.value || null,
              )
            }
            className={`${fieldClasses} cursor-pointer`}
          >
            <option value="">
              Unassigned
            </option>

            {staff
              .filter(
                (member) =>
                  member.isActive &&
                  member.workTypes.includes(
                    "cleaning",
                  ),
              )
              .map((member) => (
                <option
                  key={member.id}
                  value={member.id}
                >
                  {member.firstName}{" "}
                  {member.lastName}
                </option>
              ))}
          </select>

          <p className="mt-2 text-xs text-(--color-text-muted)">
            {assignedStaff
              ? `Assigned to ${assignedStaff.firstName} ${assignedStaff.lastName}`
              : "No cleaner assigned yet"}
          </p>
        </div>

        <div className="min-w-0">
          <label
            htmlFor={`status-${task.id}`}
            className="mb-1.5 block text-xs font-medium text-(--color-text-muted)"
          >
            Task status
          </label>

          <select
            id={`status-${task.id}`}
            value={task.status}
            onChange={(event) =>
              onStatusChange(
                task.id,
                event.target
                  .value as WorkTaskStatus,
              )
            }
            className={`${fieldClasses} cursor-pointer`}
          >
            <option value="pending">
              Pending
            </option>

            <option value="in-progress">
              In progress
            </option>

            <option value="completed">
              Completed
            </option>

            <option value="cancelled">
              Cancelled
            </option>
          </select>

          {assignedBy && (
            <p className="mt-2 text-xs text-(--color-text-muted)">
              Assigned by{" "}
              {assignedBy.firstName}{" "}
              {assignedBy.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 border-t border-(--color-border) pt-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-(--color-border-strong) px-3 py-2 text-sm font-medium text-(--color-text) transition hover:bg-(--color-surface-soft)sm:w-auto"
        >
          <Pencil
            size={15}
            strokeWidth={1.9}
            aria-hidden="true"
          />

          Edit
        </button>

        <button
          type="button"
          onClick={() => {
            const shouldDelete =
              window.confirm(
                "Delete this cleaning task?",
              );

            if (shouldDelete) {
              onDelete(task.id);
            }
          }}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:w-auto"
        >
          <Trash2
            size={15}
            strokeWidth={1.9}
            aria-hidden="true"
          />

          Delete
        </button>
      </div>
    </article>
  );
};

export default CleaningTaskCard;