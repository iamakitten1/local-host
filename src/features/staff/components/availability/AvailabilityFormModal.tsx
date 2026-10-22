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

const fieldClasses =
  "w-full min-w-0 rounded-xl border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary-muted) focus:ring-2 focus:ring-(--color-primary-soft)";

const AvailabilityFormModal = ({
  member,
  date,
  availability,
  onClose,
  onSave,
}: AvailabilityFormModalProps) => {
  const [status, setStatus] =
    useState<AvailabilityStatus>(
      availability?.status ?? "available",
    );

  const [availableFrom, setAvailableFrom] =
    useState(
      availability?.availableFrom ?? "",
    );

  const [availableUntil, setAvailableUntil] =
    useState(
      availability?.availableUntil ?? "",
    );

  const [note, setNote] = useState(
    availability?.note ?? "",
  );

  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (status === "available") {
      const hasFrom = Boolean(availableFrom);
      const hasUntil = Boolean(availableUntil);

      if (hasFrom !== hasUntil) {
        window.alert(
          "Please set both From and Until times, or leave both empty.",
        );
        return;
      }

      if (
        availableFrom &&
        availableUntil &&
        availableFrom >= availableUntil
      ) {
        window.alert(
          "Until time must be later than From time.",
        );
        return;
      }
    }

    const savedAvailability: StaffAvailability = {
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
        <div className="space-y-5 p-4 sm:p-5">
          <div className="rounded-2xl border border-(--color-border) bg-(--color-surface-soft) p-4">
            <p className="font-semibold text-(--color-text)">
              {member.firstName} {member.lastName}
            </p>

            <p className="mt-1 text-sm text-(--color-text-muted)">
              {date}
            </p>
          </div>

          <div>
            <label
              htmlFor="availability-status"
              className="mb-1.5 block text-sm font-medium text-(--color-text)"
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
              className={`${fieldClasses} cursor-pointer`}
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
                <label
                  htmlFor="availability-from"
                  className="mb-1.5 block text-sm font-medium text-(--color-text)"
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
                  className={fieldClasses}
                />
              </div>

              <div>
                <label
                  htmlFor="availability-until"
                  className="mb-1.5 block text-sm font-medium text-(--color-text)"
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
                  className={fieldClasses}
                />
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="availability-note"
              className="mb-1.5 block text-sm font-medium text-(--color-text)"
            >
              Note
            </label>

            <textarea
              id="availability-note"
              value={note}
              onChange={(event) =>
                setNote(event.target.value)
              }
              rows={3}
              placeholder="Optional note..."
              className={`${fieldClasses} resize-none`}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-(--color-border) p-4 sm:flex-row sm:justify-end sm:p-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-xl border border-(--color-border-strong) px-4 py-2.5 text-sm font-medium text-(--color-text) transition hover:bg-(--color-surface-soft) sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) sm:w-auto"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AvailabilityFormModal;