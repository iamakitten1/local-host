import {
  BedDouble,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

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
  return (
    <article className="min-w-0 rounded-2xl border border-[#e7e5df] bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#edf3ef] text-[#3f6f60]">
            <BedDouble
              size={18}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </div>

          <h2 className="mt-4 text-lg font-semibold tracking-tight text-gray-900">
            {room.name}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <Users
              size={15}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <span>
              Capacity: {room.capacity}{" "}
              {room.capacity === 1
                ? "guest"
                : "guests"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-[#efede7] pt-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Available beds
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {room.availableBeds.map((bed) => (
            <span
              key={bed.type}
              className="rounded-full bg-[#f5f4ef] px-3 py-1.5 text-xs font-medium capitalize text-gray-700"
            >
              {bed.quantity} {bed.type}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex gap-2 border-t border-[#efede7] pt-4">
        <button
          type="button"
          onClick={() =>
            onEdit(room)
          }
          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#ddd9d0] px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-[#f7f6f2] sm:flex-none"
        >
          <Pencil
            size={15}
            strokeWidth={1.9}
            aria-hidden="true"
          />

          Edit
        </button>

        <button
          type="button"
          onClick={() =>
            onDelete(room.id)
          }
          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:flex-none"
        >
          <Trash2
            size={15}
            strokeWidth={1.9}
            aria-hidden="true"
          />

          Delete
        </button>
      </div>
    </article>
  );
};

export default RoomCard;