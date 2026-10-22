import { useState } from "react";

import Modal from "../../../components/ui/Modal";

import type { Room } from "../../../types/room";

type EditRoomModalProps = {
  room: Room;
  onClose: () => void;

  onSave: (
    roomId: string,
    name: string,
    capacity: number,
  ) => void;
};

const EditRoomModal = ({
  room,
  onClose,
  onSave,
}: EditRoomModalProps) => {
  const [roomName, setRoomName] =
    useState(room.name);

  const [capacity, setCapacity] =
    useState(String(room.capacity));

  const [error, setError] =
    useState("");

  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!roomName.trim()) {
      setError(
        "Room name is required.",
      );
      return;
    }

    if (Number(capacity) < 1) {
      setError(
        "Capacity must be at least 1.",
      );
      return;
    }

    setError("");

    onSave(
      room.id,
      roomName.trim(),
      Number(capacity),
    );

    onClose();
  };

  return (
    <Modal
      title="Edit Room"
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="min-w-0"
      >
        <div className="space-y-5 p-4 sm:p-5">
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
              onChange={(event) =>
                setRoomName(
                  event.target.value,
                )
              }
              placeholder="e.g. Room Green"
              className="w-full min-w-0 rounded-xl border border-[#ddd9d0] bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#5b7e72] focus:ring-2 focus:ring-[#5b7e72]/10"
            />
          </div>

          <div>
            <label
              htmlFor="edit-room-capacity"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Recommended capacity
            </label>

            <input
              id="edit-room-capacity"
              type="number"
              min="1"
              value={capacity}
              onChange={(event) =>
                setCapacity(
                  event.target.value,
                )
              }
              placeholder="e.g. 2"
              className="w-full min-w-0 rounded-xl border border-[#ddd9d0] bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#5b7e72] focus:ring-2 focus:ring-[#5b7e72]/10"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5">
              <p className="text-sm font-medium text-red-700">
                {error}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-[#e7e5df] p-4 sm:flex-row sm:justify-end sm:p-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-xl border border-[#ddd9d0] px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-[#f7f6f2] sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-[#3f6f60] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#345f52] sm:w-auto"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditRoomModal;