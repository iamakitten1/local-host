import { useState } from "react";
import type { BedConfiguration } from "../../../types/room";

type AddRoomModalProps = {
  onClose: () => void;
  onAddRoom: (name: string, capacity: number) => void;
};

const AddRoomModal = ({ onClose, onAddRoom }: AddRoomModalProps) => {
  // Basic room fields
  const [roomName, setRoomName] = useState("");
  const [capacity, setCapacity] = useState("");

  // Validation message
  const [error, setError] = useState("");

  // Room-ის შესაძლო bed configurations
  const [bedConfigurations, setBedConfigurations] =
    useState<BedConfiguration[]>([]);

  // ახალი configuration-ის დამატება
  const handleAddConfiguration = () => {
    const newConfiguration: BedConfiguration = {
      id: `config-${Date.now()}`,
      name: "New configuration",
      guestCapacity: 1,
      beds: [],
    };

    setBedConfigurations((currentConfigurations) => [
      ...currentConfigurations,
      newConfiguration,
    ]);
  };

  // კონკრეტული configuration-ის name ან guestCapacity-ის შეცვლა
  const handleConfigurationChange = (
    configurationId: string,
    field: "name" | "guestCapacity",
    value: string,
  ) => {
    setBedConfigurations((currentConfigurations) =>
      currentConfigurations.map((configuration) =>
        configuration.id === configurationId
          ? {
              ...configuration,
              [field]:
                field === "guestCapacity" ? Number(value) : value,
            }
          : configuration,
      ),
    );
  };

  // მთელი Add Room form-ის submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

    // ჯერ ისევ მხოლოდ name და capacity გადაგვაქვს parent-ში.
    // Bed configurations-ს ცოტა ქვემოთ მივაბამთ.
    onAddRoom(roomName.trim(), Number(capacity));

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
        {/* Modal header */}
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
                onChange={(event) => setRoomName(event.target.value)}
                placeholder="e.g. Room Green"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
              />
            </div>

            {/* Capacity */}
            <div>
              <label
                htmlFor="room-capacity"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Capacity
              </label>

              <input
                id="room-capacity"
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
              <p className="text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            {/* Bed configurations */}
            <div className="border-t border-gray-200 pt-4">
              {/* Section header */}
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  Bed configurations
                </h3>

                <button
                  type="button"
                  onClick={handleAddConfiguration}
                  className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-gray-900"
                >
                  + Add configuration
                </button>
              </div>

              {/* Configuration list */}
              <div className="mt-3 space-y-3">
                {bedConfigurations.map((configuration) => (
                  <div
                    key={configuration.id}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <div className="space-y-3">
                      {/* Configuration name */}
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                          Configuration name
                        </label>

                        <input
                          type="text"
                          value={configuration.name}
                          onChange={(event) =>
                            handleConfigurationChange(
                              configuration.id,
                              "name",
                              event.target.value,
                            )
                          }
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
                        />
                      </div>

                      {/* Guest capacity */}
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                          Guest capacity
                        </label>

                        <input
                          type="number"
                          min="1"
                          value={configuration.guestCapacity}
                          onChange={(event) =>
                            handleConfigurationChange(
                              configuration.id,
                              "guestCapacity",
                              event.target.value,
                            )
                          }
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
                        />
                      </div>

                      {/* ჯერ beds-ის რაოდენობას მხოლოდ ვაჩვენებთ */}
                      <p className="text-sm text-gray-500">
                        Beds: {configuration.beds.length}
                      </p>
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