import { useState } from "react";
import {
  CalendarCheck2,
  Plus,
} from "lucide-react";

import { bookings } from "../data/bookings";

import BookingCard from "../features/bookings/components/BookingCard";
import AddBookingModal from "../features/bookings/components/AddBookingModal";
import EditBookingModal from "../features/bookings/components/EditBookingModal";

import type { Booking } from "../types/booking";

const BookingsPage = () => {
  const [bookingList, setBookingList] =
    useState<Booking[]>(bookings);

  const [
    isAddBookingOpen,
    setIsAddBookingOpen,
  ] = useState(false);

  const [
    editingBooking,
    setEditingBooking,
  ] = useState<Booking | null>(null);

  const handleAddBooking = (
    booking: Booking,
  ) => {
    setBookingList(
      (currentBookings) => [
        ...currentBookings,
        booking,
      ],
    );
  };

  const handleDeleteBooking = (
    bookingId: string,
  ) => {
    setBookingList(
      (currentBookings) =>
        currentBookings.filter(
          (booking) =>
            booking.id !== bookingId,
        ),
    );
  };

  const handleSaveBooking = (
    updatedBooking: Booking,
  ) => {
    setBookingList(
      (currentBookings) =>
        currentBookings.map(
          (booking) =>
            booking.id ===
            updatedBooking.id
              ? updatedBooking
              : booking,
        ),
    );
  };

  return (
    <div className="min-w-0">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-widest text-[#5b7e72]">
            Property
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Bookings
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage reservations and guest stays.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsAddBookingOpen(true)
          }
          className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#3f6f60] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#345f52] sm:w-auto"
        >
          <Plus
            size={17}
            strokeWidth={2}
            aria-hidden="true"
          />

          Add Booking
        </button>
      </div>

      <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#e7e5df] bg-white px-4 py-3 shadow-sm">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#edf3ef] text-[#3f6f60]">
          <CalendarCheck2
            size={18}
            strokeWidth={1.9}
            aria-hidden="true"
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-900">
            {bookingList.length}{" "}
            {bookingList.length === 1
              ? "booking"
              : "bookings"}
          </p>

          <p className="text-xs text-gray-500">
            Current reservations
          </p>
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {bookingList.map(
          (booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onDelete={
                handleDeleteBooking
              }
              onEdit={
                setEditingBooking
              }
            />
          ),
        )}
      </div>

      {isAddBookingOpen && (
        <AddBookingModal
          onClose={() =>
            setIsAddBookingOpen(false)
          }
          onAddBooking={
            handleAddBooking
          }
        />
      )}

      {editingBooking && (
        <EditBookingModal
          booking={editingBooking}
          onClose={() =>
            setEditingBooking(null)
          }
          onSave={
            handleSaveBooking
          }
        />
      )}
    </div>
  );
};

export default BookingsPage;