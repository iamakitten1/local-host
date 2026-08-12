import { useState } from "react";
import { bookings } from "../data/bookings";
import type { Booking } from "../types/booking";
import BookingCard from "../features/bookings/components/BookingCard";
import AddBookingModal from "../features/bookings/components/AddBookingModal";
import EditBookingModal from "../features/bookings/components/EditBookingModal";

const BookingsPage = () => {
  const [bookingList, setBookingList] = useState<Booking[]>(bookings);
  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const handleAddBooking = (booking: Booking) => {
    setBookingList((currentBookings) => [...currentBookings, booking]);
  };

  const handleDeleteBooking = (bookingId: string) => {
    setBookingList((currentBookings) =>
      currentBookings.filter((booking) => booking.id !== bookingId),
    );
  };

  const handleSaveBooking = (updatedBooking: Booking) => {
    setBookingList((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === updatedBooking.id ? updatedBooking : booking,
      ),
    );
  };

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Bookings
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage reservations and guest stays
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddBookingOpen(true)}
          className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
        >
          + Add Booking
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {bookingList.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onDelete={handleDeleteBooking}
            onEdit={setEditingBooking}
          />
        ))}
      </div>

      {isAddBookingOpen && (
        <AddBookingModal
          onClose={() => setIsAddBookingOpen(false)}
          onAddBooking={handleAddBooking}
        />
      )}
      {editingBooking && (
        <EditBookingModal
          booking={editingBooking}
          onClose={() => setEditingBooking(null)}
          onSave={handleSaveBooking}
        />
      )}
    </div>
  );
};

export default BookingsPage;
