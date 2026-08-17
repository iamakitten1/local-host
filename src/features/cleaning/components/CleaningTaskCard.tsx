import { rooms } from "../../../data/rooms";
import { bookings } from "../../../data/bookings";
import { staff } from "../../../data/staff";
import CleaningStatusBadge from "./CleaningStatusBadge";
import type {
  WorkTask,
  WorkTaskStatus,
} from "../../../types/workTask";

type CleaningTaskCardProps = {
  task: WorkTask;

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

const CleaningTaskCard = ({
  task,
  onStatusChange,
  onStaffChange,
  onDelete,
  onEdit,
}: CleaningTaskCardProps) => {
  const room = rooms.find(
    (room) => room.id === task.roomId,
  );

  const booking = bookings.find(
    (booking) => booking.id === task.bookingId,
  );

  const assignedStaffId =
    task.assignedStaffIds[0] ?? "";

  return (
    <article className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-gray-900">
            {room?.name ?? "Unknown room"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {task.date}
          </p>
        </div>

        <CleaningStatusBadge status={task.status} />
      </div>

      <div className="mt-4 space-y-1.5 text-sm text-gray-600">
        {booking ? (
          <>
            <p>
              Prepare for{" "}
              <span className="font-medium text-gray-900">
                {booking.guestCount}{" "}
                {booking.guestCount === 1
                  ? "guest"
                  : "guests"}
              </span>
            </p>

            <p>
              Bed setup{" "}
              <span className="font-medium text-gray-900">
                {booking.selectedBeds.length > 0
                  ? booking.selectedBeds
                      .map(
                        (bed) =>
                          `${bed.quantity} ${bed.type}`,
                      )
                      .join(" + ")
                  : "Not selected"}
              </span>
            </p>
          </>
        ) : (
          <p className="text-gray-500">
            No booking linked
          </p>
        )}

        {task.instructions && (
          <p className="pt-2 text-gray-600">
            <span className="font-medium text-gray-900">
              Instructions:
            </span>{" "}
            {task.instructions}
          </p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-gray-200 pt-4 md:grid-cols-[minmax(0,1fr)_160px]">
        <div className="min-w-0">
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Staff
          </label>

          <select
            value={assignedStaffId}
            onChange={(event) =>
              onStaffChange(
                task.id,
                event.target.value || null,
              )
            }
            className="h-10 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-500"
          >
            <option value="">Unassigned</option>

            {staff
              .filter(
                (member) =>
                  member.role === "staff",
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
            Status
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
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2 border-t border-gray-200 pt-4">
        <button
          type="button"
          onClick={() => onEdit(task)}
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