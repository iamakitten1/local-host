import { useState } from "react";

import Modal from "../../../../components/ui/Modal";

import type {
  AvailabilityStatus,
  Staff,
  StaffAvailability,
} from "../../../../types/staff";

type AvailabilityFormModalProps = {
  member: Staff;
  date: string;
  availability?: StaffAvailability;

  onClose: () => void;

  onSave: (
    availability: StaffAvailability,
  ) => void;
};

const AvailabilityFormModal = ({
  member,
  date,
  availability,
  onClose,
  onSave,
}: AvailabilityFormModalProps) => {
  const [status, setStatus] =
    useState<AvailabilityStatus>(
      availability?.status ??
        "available",
    );

  const [
    availableFrom,
    setAvailableFrom,
  ] = useState(
    availability?.availableFrom ?? "",
  );

  const [
    availableUntil,
    setAvailableUntil,
  ] = useState(
    availability?.availableUntil ?? "",
  );

  const [note, setNote] = useState(
    availability?.note ?? "",
  );

  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const savedAvailability: StaffAvailability =
      {
        id:
          availability?.id ??
          `availability-${Date.now()}`,

        propertyId:
          availability?.propertyId ??
          "property-1",

        staffId: member.id,
        date,

        status,

        availableFrom:
          status === "available"
            ? availableFrom || null
            : null,

        availableUntil:
          status === "available"
            ? availableUntil || null
            : null,

        note:
          note.trim() || undefined,
      };

    onSave(savedAvailability);
    onClose();
  };

  return (
    <Modal
      title={
        availability
          ? "Edit Availability"
          : "Add Availability"
      }
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="min-w-0"
      >
        <div className="space-y-4 p-4 sm:p-5">
          {/* Staff + date */}
          <div className="min-w-0 rounded-lg bg-gray-50 p-3">
            <p className="wrap-break-word font-medium text-gray-900">
              {member.firstName}{" "}
              {member.lastName}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {date}
            </p>
          </div>

          {/* Availability status */}
          <div className="min-w-0">
            <label
              htmlFor="availability-status"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Availability
            </label>

            <select
              id="availability-status"
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target
                    .value as AvailabilityStatus,
                )
              }
              className="w-full min-w-0 cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
            >
              <option value="available">
                Available
              </option>

              <option value="unavailable">
                Unavailable
              </option>
            </select>
          </div>

          {/* Available time */}
          {status === "available" && (
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="min-w-0">
                <label
                  htmlFor="availability-from"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  From
                </label>

                <input
                  id="availability-from"
                  type="time"
                  value={availableFrom}
                  onChange={(event) =>
                    setAvailableFrom(
                      event.target.value,
                    )
                  }
                  className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                />
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="availability-until"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Until
                </label>

                <input
                  id="availability-until"
                  type="time"
                  value={availableUntil}
                  onChange={(event) =>
                    setAvailableUntil(
                      event.target.value,
                    )
                  }
                  className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                />
              </div>
            </div>
          )}

          {/* Note */}
          <div className="min-w-0">
            <label
              htmlFor="availability-note"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Note
            </label>

            <textarea
              id="availability-note"
              value={note}
              onChange={(event) =>
                setNote(
                  event.target.value,
                )
              }
              rows={3}
              placeholder="Optional note..."
              className="w-full min-w-0 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 p-4 sm:flex-row sm:justify-end sm:p-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AvailabilityFormModal;