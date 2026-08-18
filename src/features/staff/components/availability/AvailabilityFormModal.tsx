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
  onSave: (availability: StaffAvailability) => void;
};

const AvailabilityFormModal = ({
  member,
  date,
  availability,
  onClose,
  onSave,
}: AvailabilityFormModalProps) => {
  const [status, setStatus] = useState<AvailabilityStatus>(
    availability?.status ?? "available",
  );

  const [availableFrom, setAvailableFrom] = useState(
    availability?.availableFrom ?? "",
  );

  const [availableUntil, setAvailableUntil] = useState(
    availability?.availableUntil ?? "",
  );

  const [note, setNote] = useState(
    availability?.note ?? "",
  );

  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const savedAvailability: StaffAvailability = {
      id:
        availability?.id ??
        `availability-${Date.now()}`,

      propertyId:
        availability?.propertyId ?? "property-1",

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

      note: note.trim() || undefined,
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
        className="space-y-4 p-5"
      >
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="font-medium text-gray-900">
            {member.firstName} {member.lastName}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {date}
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Availability
          </label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as AvailabilityStatus,
              )
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="available">
              Available
            </option>

            <option value="unavailable">
              Unavailable
            </option>
          </select>
        </div>

        {status === "available" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                From
              </label>

              <input
                type="time"
                value={availableFrom}
                onChange={(event) =>
                  setAvailableFrom(event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Until
              </label>

              <input
                type="time"
                value={availableUntil}
                onChange={(event) =>
                  setAvailableUntil(event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Note
          </label>

          <textarea
            value={note}
            onChange={(event) =>
              setNote(event.target.value)
            }
            rows={3}
            placeholder="Optional note..."
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AvailabilityFormModal;