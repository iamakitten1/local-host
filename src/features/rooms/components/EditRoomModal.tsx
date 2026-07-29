import { useState } from "react";
import type { Room } from "../../../types/room";

type EditRoomModalProps = {
  room: Room;
  onClose: () => void;
  onSave: (roomId: string, name: string, capacity: number) => void;
};

const EditRoomModal = ({ room, onClose, onSave }: EditRoomModalProps) => {
  const [roomName, setRoomName] = useState(room.name);
  const [capacity, setCapacity] = useState(String(room.capacity));
  const [error, setError] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (roomName.trim() === "") {
      setError("Room name is required");
      return;
    }

    if (Number(capacity) < 1) {
      setError("Capacity must be at least 1");
      return;
    }

    setError("");

    onSave(room.id, roomName.trim(), Number(capacity));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-black/40"
      />

      {/* Modal window */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-xl">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <h2 className="text-xl font-semibold text-gray-900">Edit Room</h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="space-y-4 p-5">
            {/* Room name */}
            <div>
              <label
                htmlFor="edit-room-name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Room name
              </label>

              <input
                id="edit-room-name"
                type="text"
                value={roomName}
                onChange={(event) => setRoomName(event.target.value)}
                placeholder="e.g. Room Green"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
              />
            </div>

            {/* Capacity */}
            <div>
              <label
                htmlFor="edit-room-capacity"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Capacity
              </label>

              <input
                id="edit-room-capacity"
                type="number"
                min="1"
                value={capacity}
                onChange={(event) => setCapacity(event.target.value)}
                placeholder="e.g. 2"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
              />
            </div>

            {/* Validation error */}
            {error && (
              <p className="text-sm font-medium text-red-600">{error}</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-200 p-5">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoomModal;
