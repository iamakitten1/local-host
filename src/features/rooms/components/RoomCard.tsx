import type { Room } from "../../../types/room";

type RoomCardProps = {
  room: Room;
  onDelete: (roomId: string) => void;
  onEdit: (room: Room) => void;
};

const RoomCard = ({
  room,
  onDelete,
  onEdit,
}: RoomCardProps) => {
  const roomColor =
    room.id === "room-blue"
      ? "bg-blue-500"
      : room.id === "room-orange"
        ? "bg-orange-500"
        : room.id === "room-red"
          ? "bg-red-500"
          : "bg-gray-400";

  return (
    <article className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div
        className={`h-1.5 ${roomColor}`}
      />

      <div className="p-4 sm:p-5">
        <div className="min-w-0">
          <h2 className="wrap-break-word text-lg font-semibold text-gray-900">
            {room.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Recommended capacity:{" "}
            {room.capacity}{" "}
            {room.capacity === 1
              ? "guest"
              : "guests"}
          </p>
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-semibold text-gray-700">
            Available beds
          </h3>

          <div className="mt-2 space-y-2">
            {room.availableBeds.map(
              (bed) => (
                <div
                  key={bed.type}
                  className="rounded-lg bg-gray-50 px-3 py-2"
                >
                  <p className="text-sm capitalize text-gray-600">
                    {bed.quantity}{" "}
                    {bed.type}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-2 border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={() =>
              onEdit(room)
            }
            className="flex-1 cursor-pointer rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:flex-none"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(room.id)
            }
            className="flex-1 cursor-pointer rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 sm:flex-none"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default RoomCard;