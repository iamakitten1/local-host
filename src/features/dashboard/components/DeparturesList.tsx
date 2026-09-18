import {
  LogOut,
  UserRound,
} from "lucide-react";

import type { Booking } from "../../../types/booking";
import { rooms } from "../../../data/rooms";

type DeparturesListProps = {
  bookings: Booking[];
};

const DeparturesList = ({
  bookings,
}: DeparturesListProps) => {
  return (
    <section className="mt-8 min-w-0">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#5b7e72]">
            Today
          </p>

          <h2 className="mt-1 text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
            Departures
          </h2>
        </div>

        <span className="rounded-full bg-[#edf3ef] px-2.5 py-1 text-xs font-semibold text-[#3f6f60]">
          {bookings.length}
        </span>
      </div>

      <div className="space-y-3">
        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#d9d7d0] bg-white/60 p-5 text-sm text-gray-500">
            No departures scheduled for today.
          </div>
        ) : (
          bookings.map((booking) => {
            const room = rooms.find(
              (room) =>
                room.id === booking.roomId,
            );

            return (
              <div
                key={booking.id}
                className="min-w-0 rounded-2xl border border-[#e7e5df] bg-white p-4 shadow-sm"
              >
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#5b7e72]">
                      {room?.name ??
                        "Unknown room"}
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {booking.guestName}
                    </p>
                  </div>

                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#f5f4ef] text-gray-500">
                    <UserRound
                      size={17}
                      strokeWidth={1.9}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                  <span>
                    {booking.guestCount}{" "}
                    {booking.guestCount === 1
                      ? "guest"
                      : "guests"}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <LogOut
                      size={15}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />

                    Check-out today
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default DeparturesList;