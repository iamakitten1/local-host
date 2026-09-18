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

  onStatusChange: (
    value: BookingStatus,
  ) => void;

  onGuestNameChange: (
    value: string,
  ) => void;

  onRoomChange: (
    value: string,
  ) => void;

  onGuestCountChange: (
    value: string,
  ) => void;

  onCheckInChange: (
    value: string,
  ) => void;

  onCheckOutChange: (
    value: string,
  ) => void;

  onArrivalTimeChange: (
    value: string,
  ) => void;
};

const fieldClasses =
  "w-full min-w-0 rounded-xl border border-[#ddd9d0] bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#5b7e72] focus:ring-2 focus:ring-[#5b7e72]/10";

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
    <div className="min-w-0 space-y-5">
      <div className="min-w-0">
        <label
          htmlFor="booking-guest-name"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Guest name
        </label>

        <input
          id="booking-guest-name"
          type="text"
          value={guestName}
          onChange={(event) =>
            onGuestNameChange(
              event.target.value,
            )
          }
          placeholder="Guest full name"
          className={fieldClasses}
        />
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label
            htmlFor="booking-room"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Room
          </label>

          <select
            id="booking-room"
            value={roomId}
            onChange={(event) =>
              onRoomChange(
                event.target.value,
              )
            }
            className={`${fieldClasses} cursor-pointer`}
          >
            <option value="">
              Select room
            </option>

            {rooms.map((room) => (
              <option
                key={room.id}
                value={room.id}
              >
                {room.name}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          <label
            htmlFor="booking-guest-count"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Guest count
          </label>

          <input
            id="booking-guest-count"
            type="number"
            min="1"
            value={guestCount}
            onChange={(event) =>
              onGuestCountChange(
                event.target.value,
              )
            }
            className={fieldClasses}
          />
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label
            htmlFor="booking-check-in"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Check-in
          </label>

          <input
            id="booking-check-in"
            type="date"
            value={checkInDate}
            onChange={(event) =>
              onCheckInChange(
                event.target.value,
              )
            }
            className={fieldClasses}
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="booking-check-out"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Check-out
          </label>

          <input
            id="booking-check-out"
            type="date"
            value={checkOutDate}
            onChange={(event) =>
              onCheckOutChange(
                event.target.value,
              )
            }
            className={fieldClasses}
          />
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label
            htmlFor="booking-arrival-time"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Arrival time
          </label>

          <input
            id="booking-arrival-time"
            type="time"
            value={arrivalTime}
            onChange={(event) =>
              onArrivalTimeChange(
                event.target.value,
              )
            }
            className={fieldClasses}
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="booking-status"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <select
            id="booking-status"
            value={status}
            onChange={(event) =>
              onStatusChange(
                event.target
                  .value as BookingStatus,
              )
            }
            className={`${fieldClasses} cursor-pointer`}
          >
            <option value="confirmed">
              Confirmed
            </option>

            <option value="checked-in">
              Checked in
            </option>

            <option value="checked-out">
              Checked out
            </option>

            <option value="cancelled">
              Cancelled
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default BookingFormFields;