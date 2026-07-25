import type { Room } from "../../../types/room";

type RoomCardProps = {
  room: Room;
  onDelete: (roomId: string) => void;
  onEdit: (room: Room) => void;
};

const RoomCard = ({ room, onDelete, onEdit }: RoomCardProps) => {
  const roomColor =
    room.id === "room-blue"
      ? "bg-blue-500"
      : room.id === "room-orange"
        ? "bg-orange-500"
        : room.id === "room-red"
          ? "bg-red-500"
          : "bg-gray-400";

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className={`h-1.5 ${roomColor}`} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{room.name}</h2>

            <p className="mt-1 text-sm text-gray-500">
              Capacity: {room.capacity}{" "}
              {room.capacity === 1 ? "guest" : "guests"}
            </p>
          </div>

          <div className="flex gap-2">
          <button
  type="button"
  onClick={() => onEdit(room)}
  className="cursor-pointer rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
>
  Edit
</button>

            <button
              type="button"
              onClick={() => onDelete(room.id)}
              className="cursor-pointer rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-semibold text-gray-700">
            Bed configurations
          </h3>

          <div className="mt-2 space-y-2">
            {room.bedConfigurations.map((configuration) => (
              <div
                key={configuration.id}
                className="rounded-lg bg-gray-50 px-3 py-2"
              >
                <p className="text-sm font-medium text-gray-800">
                  {configuration.name}
                </p>

                <p className="text-sm text-gray-500">
                  {configuration.beds
                    .map((bed) => `${bed.quantity} ${bed.type}`)
                    .join(" + ")}
                </p>
              </div>
            ))}
          </div>
          {room.extraBeds.length > 0 && (
            <div className="mt-5">
              <h3 className="text-sm font-semibold text-gray-700">
                Extra beds
              </h3>

              <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2">
                {room.extraBeds.map((bed) => (
                  <p key={bed.type} className="text-sm text-gray-500">
                    {bed.quantity} {bed.type}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default RoomCard;
