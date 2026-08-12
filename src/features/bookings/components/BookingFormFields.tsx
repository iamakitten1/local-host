import { rooms } from "../../../data/rooms";
import type { BookingStatus } from "../../../types/booking";

type BookingFormFieldsProps = {
  guestName: string;
  roomId: string;
  guestCount: string;
  checkInDate: string;
  checkOutDate: string;
  arrivalTime: string;
  status: BookingStatus;
  onStatusChange: (value: BookingStatus) => void;
  onGuestNameChange: (value: string) => void;
  onRoomChange: (value: string) => void;
  onGuestCountChange: (value: string) => void;
  onCheckInChange: (value: string) => void;
  onCheckOutChange: (value: string) => void;
  onArrivalTimeChange: (value: string) => void;
};

const BookingFormFields = ({
  guestName,
  roomId,
  guestCount,
  checkInDate,
  checkOutDate,
  arrivalTime,
  status,
  onStatusChange,
  onGuestNameChange,
  onRoomChange,
  onGuestCountChange,
  onCheckInChange,
  onCheckOutChange,
  onArrivalTimeChange,
}: BookingFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Guest name
        </label>

        <input
          type="text"
          value={guestName}
          onChange={(event) => onGuestNameChange(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Room
        </label>

        <select
          value={roomId}
          onChange={(event) => onRoomChange(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
        >
          <option value="">Select room</option>

          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Guest count
        </label>

        <input
          type="number"
          min="1"
          value={guestCount}
          onChange={(event) => onGuestCountChange(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Check-in
          </label>

          <input
            type="date"
            value={checkInDate}
            onChange={(event) => onCheckInChange(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Check-out
          </label>

          <input
            type="date"
            value={checkOutDate}
            onChange={(event) => onCheckOutChange(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Arrival time
        </label>

        <input
          type="time"
          value={arrivalTime}
          onChange={(event) => onArrivalTimeChange(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
        />
      </div>
    </div>
  );
};

export default BookingFormFields;