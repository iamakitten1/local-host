import { useState } from "react";
import Modal from "../../../components/ui/Modal";
import { rooms } from "../../../data/rooms";
import { bookings } from "../../../data/bookings";
import { staff } from "../../../data/staff";
import type {
  WorkTask,
  WorkTaskStatus,
} from "../../../types/workTask";

type EditCleaningTaskModalProps = {
  task: WorkTask;
  onClose: () => void;
  onSave: (task: WorkTask) => void;
};

const EditCleaningTaskModal = ({
  task,
  onClose,
  onSave,
}: EditCleaningTaskModalProps) => {
  const [roomId, setRoomId] = useState(task.roomId ?? "");
  const [bookingId, setBookingId] = useState(task.bookingId ?? "");
  const [staffId, setStaffId] = useState(
    task.assignedStaffIds[0] ?? "",
  );
  const [scheduledDate, setScheduledDate] = useState(task.date);
  const [status, setStatus] =
    useState<WorkTaskStatus>(task.status);
  const [instructions, setInstructions] = useState(
    task.instructions ?? "",
  );
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

    const updatedTask: WorkTask = {
      ...task,

      title: room
        ? `Clean ${room.name}`
        : "Clean room",

      roomId,
      bookingId: bookingId || undefined,

      assignedStaffIds: staffId ? [staffId] : [],

      date: scheduledDate,

      instructions: instructions.trim() || undefined,

      status,
    };

    onSave(updatedTask);
    onClose();
  };

  return (
    <Modal title="Edit Cleaning Task" onClose={onClose}>
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

            <option value="cancelled">
              Cancelled
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
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCleaningTaskModal;