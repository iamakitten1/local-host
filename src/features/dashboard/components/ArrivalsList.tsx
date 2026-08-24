import type { Booking } from "../../../types/booking";
import { rooms } from "../../../data/rooms";

type ArrivalsListProps = {
  bookings: Booking[];
};

const ArrivalsList = ({
  bookings,
}: ArrivalsListProps) => {
  return (
    <section className="mt-8 min-w-0">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 sm:text-xl">
        Today's Arrivals
      </h2>

      <div className="space-y-3">
        {bookings.map((booking) => {
          const room = rooms.find(
            (room) =>
              room.id === booking.roomId,
          );

          return (
            <div
              key={booking.id}
              className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <p className="text-sm font-medium text-gray-500">
                {room?.name ??
                  "Unknown room"}
              </p>

              <p className="mt-1 break-words font-semibold text-gray-900">
                {booking.guestName}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {booking.guestCount}{" "}
                {booking.guestCount === 1
                  ? "guest"
                  : "guests"}
              </p>

              <p className="mt-1 break-words text-sm text-gray-500">
                Arrival:{" "}
                {booking.estimatedArrivalTime ??
                  "Time not provided"}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ArrivalsList;