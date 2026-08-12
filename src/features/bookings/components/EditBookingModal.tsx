import { useState } from "react";
import Modal from "../../../components/ui/Modal";
import BookingFormFields from "./BookingFormFields";
import BedSetupSelector from "./BedSetupSelector";
import { rooms } from "../../../data/rooms";
import type { Booking, BookingStatus } from "../../../types/booking";
import type { Bed } from "../../../types/room";

type EditBookingModalProps = {
  booking: Booking;
  onClose: () => void;
  onSave: (booking: Booking) => void;
};

const EditBookingModal = ({
  booking,
  onClose,
  onSave,
}: EditBookingModalProps) => {
  const [guestName, setGuestName] = useState(booking.guestName);
  const [roomId, setRoomId] = useState(booking.roomId);
  const [guestCount, setGuestCount] = useState(
    String(booking.guestCount),
  );
  const [checkInDate, setCheckInDate] = useState(
    booking.checkInDate,
  );
  const [checkOutDate, setCheckOutDate] = useState(
    booking.checkOutDate,
  );
  const [arrivalTime, setArrivalTime] = useState(
    booking.estimatedArrivalTime ?? "",
  );
  const [status, setStatus] = useState<BookingStatus>(
    booking.status,
  );
  const [selectedBeds, setSelectedBeds] = useState<Bed[]>(
    booking.selectedBeds,
  );
  const [error, setError] = useState("");

  const selectedRoom = rooms.find((room) => room.id === roomId);

  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!guestName.trim() || !roomId || !checkInDate || !checkOutDate) {
      setError("Please fill in all required fields.");
      return;
    }

    if (Number(guestCount) < 1) {
      setError("Guest count must be at least 1.");
      return;
    }

    if (checkOutDate <= checkInDate) {
      setError("Check-out must be after check-in.");
      return;
    }

    const updatedBooking: Booking = {
      ...booking,
      roomId,
      guestName: guestName.trim(),
      guestCount: Number(guestCount),
      checkInDate,
      checkOutDate,
      estimatedArrivalTime: arrivalTime || null,
      status,
      selectedBeds,
    };

    onSave(updatedBooking);
    onClose();
  };

  return (
    <Modal title="Edit Booking" onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-5">
        {error && (
          <p className="mb-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <BookingFormFields
          guestName={guestName}
          roomId={roomId}
          guestCount={guestCount}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          arrivalTime={arrivalTime}
          status={status}
          onGuestNameChange={setGuestName}
          onRoomChange={(value) => {
            setRoomId(value);
            setSelectedBeds([]);
          }}
          onGuestCountChange={setGuestCount}
          onCheckInChange={setCheckInDate}
          onCheckOutChange={setCheckOutDate}
          onArrivalTimeChange={setArrivalTime}
          onStatusChange={setStatus}
        />

        {selectedRoom && (
          <div className="mt-6 border-t border-gray-200 pt-5">
            <BedSetupSelector
              availableBeds={selectedRoom.availableBeds}
              selectedBeds={selectedBeds}
              onChange={setSelectedBeds}
            />
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-5">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditBookingModal;