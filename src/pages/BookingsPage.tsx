import { useState } from "react";

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
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Bookings
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage reservations and guest
            stays
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsAddBookingOpen(true)
          }
          className="w-full shrink-0 cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto"
        >
          + Add Booking
        </button>
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