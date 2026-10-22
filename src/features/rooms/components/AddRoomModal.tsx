import { useState } from "react";
import {
  Plus,
  Trash2,
} from "lucide-react";

import Modal from "../../../components/ui/Modal";

import type {
  Bed,
  BedType,
} from "../../../types/room";

type AddRoomModalProps = {
  onClose: () => void;

  onAddRoom: (
    name: string,
    capacity: number,
    availableBeds: Bed[],
  ) => void;
};

const AddRoomModal = ({
  onClose,
  onAddRoom,
}: AddRoomModalProps) => {
  const [roomName, setRoomName] =
    useState("");

  const [capacity, setCapacity] =
    useState("");

  const [
    availableBeds,
    setAvailableBeds,
  ] = useState<Bed[]>([]);

  const [error, setError] =
    useState("");

  const handleAddBed = () => {
    setAvailableBeds(
      (currentBeds) => [
        ...currentBeds,
        {
          type: "single",
          quantity: 1,
        },
      ],
    );
  };

  const handleBedTypeChange = (
    bedIndex: number,
    type: BedType,
  ) => {
    setAvailableBeds(
      (currentBeds) =>
        currentBeds.map(
          (bed, index) =>
            index === bedIndex
              ? {
                  ...bed,
                  type,
                }
              : bed,
        ),
    );
  };

  const handleBedQuantityChange = (
    bedIndex: number,
    quantity: number,
  ) => {
    setAvailableBeds(
      (currentBeds) =>
        currentBeds.map(
          (bed, index) =>
            index === bedIndex
              ? {
                  ...bed,
                  quantity,
                }
              : bed,
        ),
    );
  };

  const handleDeleteBed = (
    bedIndex: number,
  ) => {
    setAvailableBeds(
      (currentBeds) =>
        currentBeds.filter(
          (_, index) =>
            index !== bedIndex,
        ),
    );
  };

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

    onAddRoom(
      roomName.trim(),
      Number(capacity),
      availableBeds,
    );

    onClose();
  };

  return (
    <Modal
      title="Add Room"
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="min-w-0"
      >
        <div className="space-y-5 p-4 sm:p-5">
          <div>
            <label
              htmlFor="room-name"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Room name
            </label>

            <input
              id="room-name"
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
              htmlFor="room-capacity"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Recommended capacity
            </label>

            <input
              id="room-capacity"
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

          <div className="border-t border-[#efede7] pt-5">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Available beds
                </h3>

                <p className="mt-0.5 text-xs text-gray-500">
                  Add the bed types available in this room.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddBed}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#edf3ef] px-3 py-2 text-sm font-semibold text-[#3f6f60] transition hover:bg-[#e1ebe5]"
              >
                <Plus
                  size={15}
                  strokeWidth={2}
                  aria-hidden="true"
                />

                Add bed
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {availableBeds.map(
                (bed, bedIndex) => (
                  <div
                    key={bedIndex}
                    className="min-w-0 rounded-2xl border border-[#e7e5df] bg-[#f8f7f3] p-3"
                  >
                    <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="min-w-0">
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                          Bed type
                        </label>

                        <select
                          value={bed.type}
                          onChange={(
                            event,
                          ) =>
                            handleBedTypeChange(
                              bedIndex,
                              event.target
                                .value as BedType,
                            )
                          }
                          className="w-full min-w-0 cursor-pointer rounded-xl border border-[#ddd9d0] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#5b7e72] focus:ring-2 focus:ring-[#5b7e72]/10"
                        >
                          <option value="single">
                            Single
                          </option>

                          <option value="double">
                            Double
                          </option>

                          <option value="queen">
                            Queen
                          </option>

                          <option value="king">
                            King
                          </option>

                          <option value="sofa">
                            Sofa
                          </option>

                          <option value="bunk">
                            Bunk
                          </option>

                          <option value="baby">
                            Baby
                          </option>
                        </select>
                      </div>

                      <div className="min-w-0">
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                          Quantity
                        </label>

                        <input
                          type="number"
                          min="1"
                          value={
                            bed.quantity
                          }
                          onChange={(
                            event,
                          ) =>
                            handleBedQuantityChange(
                              bedIndex,
                              Number(
                                event.target
                                  .value,
                              ),
                            )
                          }
                          className="w-full min-w-0 rounded-xl border border-[#ddd9d0] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#5b7e72] focus:ring-2 focus:ring-[#5b7e72]/10"
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteBed(
                            bedIndex,
                          )
                        }
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2
                          size={14}
                          strokeWidth={1.9}
                          aria-hidden="true"
                        />

                        Remove
                      </button>
                    </div>
                  </div>
                ),
              )}

              {availableBeds.length ===
                0 && (
                <div className="rounded-2xl border border-dashed border-[#d9d7d0] bg-white/60 p-4 text-sm text-gray-500">
                  No beds added yet.
                </div>
              )}
            </div>
          </div>
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
            Add Room
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddRoomModal;