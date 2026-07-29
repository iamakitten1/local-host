import { useState } from "react";
import type { Bed, BedType } from "../../../types/room";

type AddRoomModalProps = {
  onClose: () => void;
  onAddRoom: (
    name: string,
    capacity: number,
    availableBeds: Bed[],
  ) => void;
};

const AddRoomModal = ({ onClose, onAddRoom }: AddRoomModalProps) => {
  // Basic Room fields
  const [roomName, setRoomName] = useState("");
  const [capacity, setCapacity] = useState("");

  // Validation
  const [error, setError] = useState("");

  // ამ ოთახში შესაძლო საწოლების ჩამონათვალი
  const [availableBeds, setAvailableBeds] = useState<Bed[]>([]);

  // ახალი შესაძლო საწოლის დამატება
  const handleAddBed = () => {
    setAvailableBeds((currentBeds) => [
      ...currentBeds,
      {
        type: "single",
        quantity: 1,
      },
    ]);
  };

  // საწოლის type-ის შეცვლა
  const handleBedTypeChange = (
    bedIndex: number,
    type: BedType,
  ) => {
    setAvailableBeds((currentBeds) =>
      currentBeds.map((bed, index) =>
        index === bedIndex
          ? {
              ...bed,
              type,
            }
          : bed,
      ),
    );
  };

  // საწოლის რაოდენობის შეცვლა
  const handleBedQuantityChange = (
    bedIndex: number,
    quantity: number,
  ) => {
    setAvailableBeds((currentBeds) =>
      currentBeds.map((bed, index) =>
        index === bedIndex
          ? {
              ...bed,
              quantity,
            }
          : bed,
      ),
    );
  };

  // საწოლის წაშლა
  const handleDeleteBed = (bedIndex: number) => {
    setAvailableBeds((currentBeds) =>
      currentBeds.filter((_, index) => index !== bedIndex),
    );
  };

  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
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

    onAddRoom(
      roomName.trim(),
      Number(capacity),
      availableBeds,
    );

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
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Add Room
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-5">
            {/* Room name */}
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
                  setRoomName(event.target.value)
                }
                placeholder="e.g. Room Green"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
              />
            </div>

            {/* Recommended capacity */}
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
                  setCapacity(event.target.value)
                }
                placeholder="e.g. 2"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
              />
            </div>

            {/* Validation */}
            {error && (
              <p className="text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            {/* Available beds */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between gap-4">
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
                {availableBeds.map((bed, bedIndex) => (
                  <div
                    key={bedIndex}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {/* Bed type */}
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                          Bed type
                        </label>

                        <select
                          value={bed.type}
                          onChange={(event) =>
                            handleBedTypeChange(
                              bedIndex,
                              event.target.value as BedType,
                            )
                          }
                          className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                        >
                          <option value="single">Single</option>
                          <option value="double">Double</option>
                          <option value="queen">Queen</option>
                          <option value="king">King</option>
                          <option value="sofa">Sofa</option>
                          <option value="bunk">Bunk</option>
                          <option value="baby">Baby</option>
                        </select>
                      </div>

                      {/* Quantity */}
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                          Quantity
                        </label>

                        <input
                          type="number"
                          min="1"
                          value={bed.quantity}
                          onChange={(event) =>
                            handleBedQuantityChange(
                              bedIndex,
                              Number(event.target.value),
                            )
                          }
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                        />
                      </div>
                    </div>

                    <div className="mt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeleteBed(bedIndex)}
                        className="cursor-pointer text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Remove bed
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomModal;