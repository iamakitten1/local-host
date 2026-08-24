import { useState } from "react";

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
        <div className="space-y-4 p-4 sm:p-5">
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
              className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
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
              className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <div className="border-t border-gray-200 pt-4">
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                Available beds
              </h3>

              <button
                type="button"
                onClick={handleAddBed}
                className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-gray-900"
              >
                + Add bed
              </button>
            </div>

            <div className="mt-3 space-y-3">
              {availableBeds.map(
                (bed, bedIndex) => (
                  <div
                    key={bedIndex}
                    className="min-w-0 rounded-lg border border-gray-200 bg-gray-50 p-3"
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
                              event
                                .target
                                .value as BedType,
                            )
                          }
                          className="w-full min-w-0 cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
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
                                event
                                  .target
                                  .value,
                              ),
                            )
                          }
                          className="w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
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
                        className="cursor-pointer text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Remove bed
                      </button>
                    </div>
                  </div>
                ),
              )}

              {availableBeds.length ===
                0 && (
                <p className="text-sm text-gray-500">
                  No beds added yet.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 p-4 sm:flex-row sm:justify-end sm:p-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto"
          >
            Add Room
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddRoomModal;