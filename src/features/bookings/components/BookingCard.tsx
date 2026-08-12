import type { Booking } from "../../../types/booking";
import { rooms } from "../../../data/rooms";

type BookingCardProps = {
  booking: Booking;
  onDelete: (bookingId: string) => void;
  onEdit: (booking: Booking) => void;
};

const BookingCard = ({ booking, onDelete, onEdit }: BookingCardProps) => {
  const room = rooms.find((room) => room.id === booking.roomId);

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {booking.guestName}
          </h2>

          <p className="mt-1 text-sm font-medium text-gray-500">
            {room?.name ?? "Unknown room"}
          </p>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
          {booking.status}
        </span>
      </div>

      {/* Booking details */}
      <div className="mt-5 space-y-2 text-sm text-gray-600">
        <p>
          Guests: {booking.guestCount}{" "}
          {booking.guestCount === 1 ? "guest" : "guests"}
        </p>

        <p>
          Stay: {booking.checkInDate} → {booking.checkOutDate}
        </p>

        <p>Arrival: {booking.estimatedArrivalTime ?? "Time not provided"}</p>
      </div>

      {/* Selected bed setup */}
      <div className="mt-5 border-t border-gray-200 pt-4">
        <h3 className="text-sm font-semibold text-gray-800">Bed setup</h3>

        {booking.selectedBeds.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {booking.selectedBeds.map((bed) => (
              <span
                key={bed.type}
                className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
              >
                {bed.quantity} {bed.type}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-gray-500">No bed setup selected</p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-5 flex justify-end border-t border-gray-200 pt-4">
        <button
          type="button"
          onClick={() => onEdit(booking)}
          className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => {
            const shouldDelete = window.confirm(
              `Delete booking for ${booking.guestName}?`,
            );

            if (shouldDelete) {
              onDelete(booking.id);
            }
          }}
          className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default BookingCard;
