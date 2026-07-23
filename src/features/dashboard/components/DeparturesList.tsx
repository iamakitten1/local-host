import type { Booking } from "../../../types/booking";
import { rooms } from "../../../data/rooms";

type DeparturesListProps = {
  bookings: Booking[];
};

const DeparturesList = ({ bookings }: DeparturesListProps) => {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Today's Departures
      </h2>

      <div className="space-y-3">
        {bookings.map((booking) => {
          const room = rooms.find((room) => room.id === booking.roomId);

          return (
            <div
              key={booking.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <p className="text-sm font-medium text-gray-500">
                {room?.name ?? "Unknown room"}
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {booking.guestName}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {booking.guestCount}{" "}
                {booking.guestCount === 1 ? "guest" : "guests"}
              </p>
              <p className="mt-1 text-sm text-gray-500">Check-out: Today</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DeparturesList;
