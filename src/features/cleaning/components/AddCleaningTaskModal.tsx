import { useState } from "react";

import Modal from "../../../components/ui/Modal";
import { rooms } from "../../../data/rooms";
import { bookings } from "../../../data/bookings";
import { staff } from "../../../data/staff";

import type { WorkTask } from "../../../types/workTask";

type AddCleaningTaskModalProps = {
  onClose: () => void;

  onAddTask: (
    task: WorkTask,
    assignedStaffId: string | null,
  ) => void;
};

const fieldClasses =
  "w-full min-w-0 rounded-xl border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary-muted) focus:ring-2 focus:ring-(--color-primary-soft)";

const AddCleaningTaskModal = ({
  onClose,
  onAddTask,
}: AddCleaningTaskModalProps) => {
  const [roomId, setRoomId] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [instructions, setInstructions] = useState("");
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

    const newTask: WorkTask = {
      id: `task-${Date.now()}`,
      propertyId: "property-1",
      type: "room-cleaning",

      title: room
        ? `Clean ${room.name}`
        : "Clean room",

      instructions:
        instructions.trim() || undefined,

      date: scheduledDate,
      startTime: startTime || undefined,
      roomId,
      bookingId: bookingId || undefined,

      status: "pending",
      priority: "normal",

      createdByStaffId: "staff-1",
      createdAt: new Date().toISOString(),
    };

    onAddTask(
      newTask,
      staffId || null,
    );

    onClose();
  };

  return (
    <Modal
      title="Add Cleaning Task"
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
                htmlFor="cleaning-room"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                Room
              </label>

              <select
                id="cleaning-room"
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
                htmlFor="cleaning-booking"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                Linked booking
              </label>

              <select
                id="cleaning-booking"
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
              htmlFor="cleaning-staff"
              className="mb-1.5 block text-sm font-medium text-(--color-text)"
            >
              Cleaner
            </label>

            <select
              id="cleaning-staff"
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
                htmlFor="cleaning-date"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                Scheduled date
              </label>

              <input
                id="cleaning-date"
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
                htmlFor="cleaning-time"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                Start time
              </label>

              <input
                id="cleaning-time"
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
              htmlFor="cleaning-instructions"
              className="mb-1.5 block text-sm font-medium text-(--color-text)"
            >
              Instructions
            </label>

            <textarea
              id="cleaning-instructions"
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
            Save Task
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCleaningTaskModal;