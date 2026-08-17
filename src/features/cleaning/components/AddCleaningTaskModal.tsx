import { useState } from "react";
import Modal from "../../../components/ui/Modal";
import { rooms } from "../../../data/rooms";
import { bookings } from "../../../data/bookings";
import { staff } from "../../../data/staff";
import type {
  WorkTask,
  WorkTaskStatus,
} from "../../../types/workTask";

type AddCleaningTaskModalProps = {
  onClose: () => void;
  onAddTask: (task: WorkTask) => void;
};

const AddCleaningTaskModal = ({
  onClose,
  onAddTask,
}: AddCleaningTaskModalProps) => {
  const [roomId, setRoomId] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [status, setStatus] =
    useState<WorkTaskStatus>("pending");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!roomId || !scheduledDate) {
      setError("Room and scheduled date are required.");
      return;
    }

    const room = rooms.find((room) => room.id === roomId);

    const newTask: WorkTask = {
      id: `task-${Date.now()}`,
      propertyId: "property-1",

      type: "room-cleaning",

      title: room
        ? `Clean ${room.name}`
        : "Clean room",

      instructions: instructions.trim() || undefined,

      date: scheduledDate,

      assignedStaffIds: staffId ? [staffId] : [],

      roomId,
      bookingId: bookingId || undefined,

      status,
      priority: "normal",

      createdByStaffId: "staff-1",
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);
    onClose();
  };

  return (
    <Modal title="Add Cleaning Task" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 p-5">
        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Room
          </label>

          <select
            value={roomId}
            onChange={(event) =>
              setRoomId(event.target.value)
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">Select room</option>

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

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Linked booking
          </label>

          <select
            value={bookingId}
            onChange={(event) =>
              setBookingId(event.target.value)
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
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

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Staff
          </label>

          <select
            value={staffId}
            onChange={(event) =>
              setStaffId(event.target.value)
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">Unassigned</option>

            {staff
              .filter(
                (member) =>
                  member.role === "staff" &&
                  member.isActive,
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

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Scheduled date
          </label>

          <input
            type="date"
            value={scheduledDate}
            onChange={(event) =>
              setScheduledDate(event.target.value)
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Instructions
          </label>

          <textarea
            value={instructions}
            onChange={(event) =>
              setInstructions(event.target.value)
            }
            rows={3}
            placeholder="Optional cleaning instructions..."
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Status
          </label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as WorkTaskStatus,
              )
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
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

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Save Task
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCleaningTaskModal;