import {
  CalendarDays,
  Clock3,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

import type { Booking } from "../../../types/booking";
import { rooms } from "../../../data/rooms";

type BookingCardProps = {
  booking: Booking;
  onDelete: (bookingId: string) => void;
  onEdit: (booking: Booking) => void;
};

const getStatusClasses = (
  status: Booking["status"],
) => {
  switch (status) {
    case "confirmed":
      return "bg-[#edf3ef] text-[#3f6f60]";

    case "checked-in":
      return "bg-sky-50 text-sky-700";

    case "checked-out":
      return "bg-gray-100 text-gray-600";

    case "cancelled":
      return "bg-red-50 text-red-700";
  }
};

const getStatusLabel = (
  status: Booking["status"],
) => {
  switch (status) {
    case "confirmed":
      return "Confirmed";

    case "checked-in":
      return "Checked in";

    case "checked-out":
      return "Checked out";

    case "cancelled":
      return "Cancelled";
  }
};

const BookingCard = ({
  booking,
  onDelete,
  onEdit,
}: BookingCardProps) => {
  const room = rooms.find(
    (room) => room.id === booking.roomId,
  );

  return (
    <article className="min-w-0 rounded-2xl border border-[#e7e5df] bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-widest text-[#5b7e72]">
            {room?.name ?? "Unknown room"}
          </p>

          <h2 className="mt-1 text-lg font-semibold tracking-tight text-gray-900">
            {booking.guestName}
          </h2>
        </div>

        <span
          className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
            booking.status,
          )}`}
        >
          {getStatusLabel(
            booking.status,
          )}
        </span>
      </div>

      <div className="mt-5 space-y-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Users
            size={16}
            strokeWidth={1.8}
            aria-hidden="true"
          />

          <span>
            {booking.guestCount}{" "}
            {booking.guestCount === 1
              ? "guest"
              : "guests"}
          </span>
        </div>

        <div className="flex items-start gap-2">
          <CalendarDays
            size={16}
            strokeWidth={1.8}
            aria-hidden="true"
            className="mt-0.5 shrink-0"
          />

          <span>
            {booking.checkInDate} →{" "}
            {booking.checkOutDate}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock3
            size={16}
            strokeWidth={1.8}
            aria-hidden="true"
          />

          <span>
            {booking.estimatedArrivalTime ??
              "Arrival time not provided"}
          </span>
        </div>
      </div>

      <div className="mt-5 border-t border-[#efede7] pt-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Bed setup
        </p>

        {booking.selectedBeds.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {booking.selectedBeds.map(
              (bed) => (
                <span
                  key={bed.type}
                  className="rounded-full bg-[#f5f4ef] px-3 py-1.5 text-xs font-medium capitalize text-gray-700"
                >
                  {bed.quantity} {bed.type}
                </span>
              ),
            )}
          </div>
        ) : (
          <p className="mt-2 text-sm text-gray-500">
            No bed setup selected
          </p>
        )}
      </div>

      <div className="mt-5 flex gap-2 border-t border-[#efede7] pt-4">
        <button
          type="button"
          onClick={() =>
            onEdit(booking)
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
          onClick={() => {
            const shouldDelete =
              window.confirm(
                `Delete booking for ${booking.guestName}?`,
              );

            if (shouldDelete) {
              onDelete(booking.id);
            }
          }}
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

export default BookingCard;