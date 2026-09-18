import { useState } from "react";

import Modal from "../../../components/ui/Modal";
import BookingFormFields from "./BookingFormFields";
import BedSetupSelector from "./BedSetupSelector";

import { rooms } from "../../../data/rooms";

import type { Bed } from "../../../types/room";
import type {
  Booking,
  BookingStatus,
} from "../../../types/booking";

type AddBookingModalProps = {
  onClose: () => void;
  onAddBooking: (booking: Booking) => void;
};

const AddBookingModal = ({
  onClose,
  onAddBooking,
}: AddBookingModalProps) => {
  const [guestName, setGuestName] =
    useState("");

  const [roomId, setRoomId] =
    useState("");

  const [guestCount, setGuestCount] =
    useState("1");

  const [checkInDate, setCheckInDate] =
    useState("");

  const [checkOutDate, setCheckOutDate] =
    useState("");

  const [arrivalTime, setArrivalTime] =
    useState("");

  const [selectedBeds, setSelectedBeds] =
    useState<Bed[]>([]);

  const [error, setError] =
    useState("");

  const [status, setStatus] =
    useState<BookingStatus>("confirmed");

  const selectedRoom = rooms.find(
    (room) => room.id === roomId,
  );

  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      !guestName.trim() ||
      !roomId ||
      !checkInDate ||
      !checkOutDate
    ) {
      setError(
        "Please fill in all required fields.",
      );
      return;
    }

    if (Number(guestCount) < 1) {
      setError(
        "Guest count must be at least 1.",
      );
      return;
    }

    if (checkOutDate <= checkInDate) {
      setError(
        "Check-out must be after check-in.",
      );
      return;
    }

    setError("");

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      propertyId: "property-1",
      roomId,
      guestName: guestName.trim(),
      guestCount: Number(guestCount),
      checkInDate,
      checkOutDate,
      estimatedArrivalTime:
        arrivalTime || null,
      status,
      selectedBeds,
    };

    onAddBooking(newBooking);
    onClose();
  };

  return (
    <Modal
      title="Add Booking"
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="min-w-0"
      >
        <div className="p-4 sm:p-5">
          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5">
              <p className="text-sm font-medium text-red-700">
                {error}
              </p>
            </div>
          )}

          <BookingFormFields
            guestName={guestName}
            roomId={roomId}
            guestCount={guestCount}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            arrivalTime={arrivalTime}
            status={status}
            onStatusChange={setStatus}
            onGuestNameChange={setGuestName}
            onRoomChange={(value) => {
              setRoomId(value);
              setSelectedBeds([]);
            }}
            onGuestCountChange={
              setGuestCount
            }
            onCheckInChange={
              setCheckInDate
            }
            onCheckOutChange={
              setCheckOutDate
            }
            onArrivalTimeChange={
              setArrivalTime
            }
          />

          {selectedRoom && (
            <div className="mt-6 border-t border-[#efede7] pt-5">
              <BedSetupSelector
                availableBeds={
                  selectedRoom.availableBeds
                }
                selectedBeds={
                  selectedBeds
                }
                onChange={
                  setSelectedBeds
                }
              />
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-[#e7e5df] p-4 sm:flex-row sm:justify-end sm:p-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-xl border border-[#ddd9d0] px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-[#f7f6f2] sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-[#3f6f60] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#345f52] sm:w-auto"
          >
            Save Booking
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBookingModal;