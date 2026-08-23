import { rooms } from "../../../data/rooms";
import { staff } from "../../../data/staff";

import CleaningStatusBadge from "./CleaningStatusBadge";

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

    default:
      return "";
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
    default:
      return "bg-amber-100 text-amber-700";
  }
};

const CleaningTaskCard = ({
  task,
  assignment,
  onStatusChange,
  onStaffChange,
  onDelete,
  onEdit,
}: CleaningTaskCardProps) => {
  const room = rooms.find(
    (room) =>
      room.id === task.roomId,
  );

  const assignedStaff =
    assignment
      ? staff.find(
          (member) =>
            member.id ===
            assignment.staffId,
        )
      : undefined;

  const assignedBy =
    assignment
      ? staff.find(
          (member) =>
            member.id ===
            assignment.assignedByStaffId,
        )
      : undefined;

  return (
    <article className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-gray-900">
            {room?.name ??
              task.title}
          </h2>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>{task.date}</span>

            {task.startTime && (
              <>
                <span>•</span>
                <span>
                  {task.startTime}
                </span>
              </>
            )}
          </div>
        </div>

        <CleaningStatusBadge
          status={task.status}
        />
      </div>

      {task.instructions && (
        <div className="mt-4 rounded-lg bg-gray-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Instructions
          </p>

          <p className="mt-1 text-sm text-gray-700">
            {task.instructions}
          </p>
        </div>
      )}

      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium text-gray-500">
            Assignment
          </p>

          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getAssignmentClasses(
              assignment,
            )}`}
          >
            {getAssignmentLabel(
              assignment,
            )}
          </span>
        </div>

        {assignedStaff && (
          <p className="mt-2 text-sm font-semibold text-gray-900">
            {assignedStaff.firstName}{" "}
            {assignedStaff.lastName}
          </p>
        )}

        {assignedBy && (
          <p className="mt-1 text-xs text-gray-500">
            Assigned by{" "}
            {assignedBy.firstName}{" "}
            {assignedBy.lastName}
          </p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-gray-200 pt-4 md:grid-cols-[minmax(0,1fr)_160px]">
        <div className="min-w-0">
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Cleaner
          </label>

          <select
            value={
              assignment?.staffId ?? ""
            }
            onChange={(event) =>
              onStaffChange(
                task.id,
                event.target.value ||
                  null,
              )
            }
            className="h-10 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-500"
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
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Task status
          </label>

          <select
            value={task.status}
            onChange={(event) =>
              onStatusChange(
                task.id,
                event.target
                  .value as WorkTaskStatus,
              )
            }
            className="h-10 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-500"
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
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2 border-t border-gray-200 pt-4">
        <button
          type="button"
          onClick={() =>
            onEdit(task)
          }
          className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
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
          className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default CleaningTaskCard;