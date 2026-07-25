import { useState } from "react";

type AddRoomModalProps = {
  onClose: () => void;
  onAddRoom: (name: string, capacity: number) => void;
};

const AddRoomModal = ({ onClose, onAddRoom }: AddRoomModalProps) => {
  const [roomName, setRoomName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [error, setError] = useState("");

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
    setError("");

    onAddRoom(roomName.trim(), Number(capacity));
    onClose();
  };

  return (
    // მთელი Modal-ის wrapper
    // fixed + inset-0 ნიშნავს, რომ მთელ ეკრანს ფარავს
    // flex-ით Modal-ს ეკრანის ცენტრში ვათავსებთ
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      {/* ეს არის Modal-ის უკან არსებული მუქი ფონი */}
      {/* მასზე დაჭერით Modal იხურება */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-black/40"
      />

      {/* Modal window */}
      {/* ეს არის თვითონ თეთრი ფანჯარა */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-xl">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <h2 className="text-xl font-semibold text-gray-900">Add Room</h2>

          {/* X ღილაკი Modal-ის დასახურად */}
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        {/* Add Room ღილაკის submit-ზე გაეშვება handleSubmit */}
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="space-y-4 p-5">
            {/* Room name field */}
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

            {/* Capacity field */}
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
              {error && (
                <p className="text-sm font-medium text-red-600">{error}</p>
              )}
            </div>
          </div>

          {/* Modal footer */}
          {/* აქ გვაქვს Cancel და Add Room ღილაკები */}
          <div className="flex justify-end gap-3 border-t border-gray-200 p-5">
            {/* Cancel არ აკეთებს submit-ს */}
            {/* უბრალოდ Modal-ს ხურავს */}
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            {/* Submit button */}
            {/* რადგან type="submit" აქვს, Form-ის onSubmit გაეშვება */}
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
