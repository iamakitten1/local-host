import { useState } from "react";

import Modal from "../../../components/ui/Modal";
import { rooms } from "../../../data/rooms";
import { bookings } from "../../../data/bookings";
import { staff } from "../../../data/staff";

import type {
  WorkTask,
  WorkTaskStatus,
} from "../../../types/workTask";

import type { Assignment } from "../../../types/assignment";

type EditCleaningTaskModalProps = {
  task: WorkTask;
  assignment?: Assignment;

  onClose: () => void;

  onSave: (
    task: WorkTask,
    assignedStaffId: string | null,
  ) => void;
};

const fieldClasses =
  "w-full min-w-0 rounded-xl border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary-muted) focus:ring-2 focus:ring-(--color-primary-soft)";

const EditCleaningTaskModal = ({
  task,
  assignment,
  onClose,
  onSave,
}: EditCleaningTaskModalProps) => {
  const [roomId, setRoomId] =
    useState(task.roomId ?? "");

  const [bookingId, setBookingId] =
    useState(task.bookingId ?? "");

  const [staffId, setStaffId] =
    useState(assignment?.staffId ?? "");

  const [scheduledDate, setScheduledDate] =
    useState(task.date);

  const [startTime, setStartTime] =
    useState(task.startTime ?? "");

  const [status, setStatus] =
    useState<WorkTaskStatus>(task.status);

  const [instructions, setInstructions] =
    useState(task.instructions ?? "");

  const [error, setError] = useState("");

  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!roomId || !scheduledDate) {
      setError(
        "Room and scheduled date are required.",
      );
      return;
    }

    setError("");

    const room = rooms.find(
      (room) => room.id === roomId,
    );

    const updatedTask: WorkTask = {
      ...task,

      title: room
        ? `Clean ${room.name}`
        : "Clean room",

      roomId,
      bookingId: bookingId || undefined,
      date: scheduledDate,
      startTime: startTime || undefined,

      instructions:
        instructions.trim() || undefined,

      status,
    };

    onSave(
      updatedTask,
      staffId || null,
    );

    onClose();
  };

  return (
    <Modal
      title="Edit Cleaning Task"
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="min-w-0"
      >
        <div className="space-y-5 p-4 sm:p-5">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5">
              <p className="text-sm font-medium text-red-700">
                {error}
              </p>
            </div>
          )}

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="edit-cleaning-room"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                Room
              </label>

              <select
                id="edit-cleaning-room"
                value={roomId}
                onChange={(event) =>
                  setRoomId(event.target.value)
                }
                className={`${fieldClasses} cursor-pointer`}
              >
                <option value="">
                  Select room
                </option>

                {rooms.map((room) => (
                  <option
                    key={room.id}
                    value={room.id}
                  >
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-0">
              <label
                htmlFor="edit-cleaning-booking"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                Linked booking
              </label>

              <select
                id="edit-cleaning-booking"
                value={bookingId}
                onChange={(event) =>
                  setBookingId(event.target.value)
                }
                className={`${fieldClasses} cursor-pointer`}
              >
                <option value="">
                  No linked booking
                </option>

                {bookings.map((booking) => (
                  <option
                    key={booking.id}
                    value={booking.id}
                  >
                    {booking.guestName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="min-w-0">
            <label
              htmlFor="edit-cleaning-staff"
              className="mb-1.5 block text-sm font-medium text-(--color-text)"
            >
              Cleaner
            </label>

            <select
              id="edit-cleaning-staff"
              value={staffId}
              onChange={(event) =>
                setStaffId(event.target.value)
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
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="edit-cleaning-date"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                Scheduled date
              </label>

              <input
                id="edit-cleaning-date"
                type="date"
                value={scheduledDate}
                onChange={(event) =>
                  setScheduledDate(
                    event.target.value,
                  )
                }
                className={fieldClasses}
              />
            </div>

            <div className="min-w-0">
              <label
                htmlFor="edit-cleaning-time"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                Start time
              </label>

              <input
                id="edit-cleaning-time"
                type="time"
                value={startTime}
                onChange={(event) =>
                  setStartTime(event.target.value)
                }
                className={fieldClasses}
              />
            </div>
          </div>

          <div className="min-w-0">
            <label
              htmlFor="edit-cleaning-instructions"
              className="mb-1.5 block text-sm font-medium text-(--color-text)"
            >
              Instructions
            </label>

            <textarea
              id="edit-cleaning-instructions"
              value={instructions}
              onChange={(event) =>
                setInstructions(
                  event.target.value,
                )
              }
              rows={3}
              placeholder="Optional cleaning instructions..."
              className={`${fieldClasses} min-h-24 resize-none`}
            />
          </div>

          <div className="min-w-0">
            <label
              htmlFor="edit-cleaning-status"
              className="mb-1.5 block text-sm font-medium text-(--color-text)"
            >
              Task status
            </label>

            <select
              id="edit-cleaning-status"
              value={status}
              onChange={(event) =>
                setStatus(
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
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-(--color-border) p-4 sm:flex-row sm:justify-end sm:p-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-xl border border-(--color-border-strong) px-4 py-2.5 text-sm font-medium text-(--color-text) transition hover:bg-(--color-surface-soft) sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) sm:w-auto"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCleaningTaskModal;