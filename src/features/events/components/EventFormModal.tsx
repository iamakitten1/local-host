import { useState } from "react";

import Modal from "../../../components/ui/Modal";
import EventStaffSelector from "./EventStaffSelector";

import type { Event as LocalHostEvent } from "../../../types/event";
import type {
  Staff,
  StaffAvailability,
} from "../../../types/staff";

type EventFormModalProps = {
  event?: LocalHostEvent;
  staffList: Staff[];
  availabilityList: StaffAvailability[];
  initialStaffIds?: string[];
  onClose: () => void;

  onSubmit: (
    event: LocalHostEvent,
    selectedStaffIds: string[],
  ) => void;
};

const fieldClasses =
  "w-full min-w-0 rounded-xl border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary-muted) focus:ring-2 focus:ring-(--color-primary-soft)";

const EventFormModal = ({
  event,
  staffList,
  availabilityList,
  initialStaffIds = [],
  onClose,
  onSubmit,
}: EventFormModalProps) => {
  const isEditing = Boolean(event);

  const [title, setTitle] = useState(
    event?.title ?? "",
  );

  const [date, setDate] = useState(
    event?.date ?? "",
  );

  const [startTime, setStartTime] =
    useState(event?.startTime ?? "");

  const [endTime, setEndTime] =
    useState(event?.endTime ?? "");

  const [area, setArea] = useState(
    event?.area ?? "",
  );

  const [instructions, setInstructions] =
    useState(event?.instructions ?? "");

  const [
    requiredStaffCount,
    setRequiredStaffCount,
  ] = useState(
    event?.requiredStaffCount ?? 1,
  );

  const [status, setStatus] = useState<
    LocalHostEvent["status"]
  >(event?.status ?? "scheduled");

  const [
    selectedStaffIds,
    setSelectedStaffIds,
  ] = useState<string[]>(initialStaffIds);

  const [error, setError] = useState("");

  const handleStaffToggle = (
    staffId: string,
  ) => {
    setSelectedStaffIds(
      (currentStaffIds) =>
        currentStaffIds.includes(staffId)
          ? currentStaffIds.filter(
              (id) => id !== staffId,
            )
          : [
              ...currentStaffIds,
              staffId,
            ],
    );
  };

  const hasUnavailableSelectedStaff =
    selectedStaffIds.some((staffId) => {
      const availability =
        availabilityList.find(
          (entry) =>
            entry.staffId === staffId &&
            entry.date === date,
        );

      if (!availability) {
        return false;
      }

      if (
        availability.status ===
        "unavailable"
      ) {
        return true;
      }

      if (
        availability.status ===
          "available" &&
        availability.availableFrom &&
        availability.availableUntil &&
        startTime &&
        endTime
      ) {
        return (
          startTime <
            availability.availableFrom ||
          endTime >
            availability.availableUntil
        );
      }

      return false;
    });

  const handleSubmit = (
    submitEvent: React.SubmitEvent<HTMLFormElement>,
  ) => {
    submitEvent.preventDefault();

    if (
      !title.trim() ||
      !date ||
      !startTime ||
      !endTime
    ) {
      setError(
        "Title, date, start time and end time are required.",
      );
      return;
    }

    if (endTime <= startTime) {
      setError(
        "End time must be later than start time.",
      );
      return;
    }

    if (requiredStaffCount < 1) {
      setError(
        "Required staff must be at least 1.",
      );
      return;
    }

    if (hasUnavailableSelectedStaff) {
      setError(
        "Remove staff who are unavailable for this event time.",
      );
      return;
    }

    setError("");

    const savedEvent: LocalHostEvent = {
      id:
        event?.id ??
        `event-${Date.now()}`,

      propertyId:
        event?.propertyId ??
        "property-1",

      title: title.trim(),

      date,
      startTime,
      endTime,

      area:
        area.trim() || undefined,

      instructions:
        instructions.trim() || undefined,

      requiredStaffCount,
      status,

      createdByStaffId:
        event?.createdByStaffId ??
        "staff-owner",

      createdAt:
        event?.createdAt ??
        new Date().toISOString(),
    };

    onSubmit(
      savedEvent,
      selectedStaffIds,
    );

    onClose();
  };

  return (
    <Modal
      title={
        isEditing
          ? "Edit Event"
          : "Add Event"
      }
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="min-w-0"
      >
        <div className="space-y-5 p-4 sm:p-5">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5">
              <p className="text-sm font-medium text-red-700">
                {error}
              </p>
            </div>
          )}

          <div className="min-w-0">
            <label
              htmlFor="event-title"
              className="mb-1.5 block text-sm font-medium text-(--color-text)"
            >
              Event title
            </label>

            <input
              id="event-title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Birthday party"
              className={fieldClasses}
            />
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="event-date"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                Date
              </label>

              <input
                id="event-date"
                type="date"
                value={date}
                onChange={(event) =>
                  setDate(event.target.value)
                }
                className={fieldClasses}
              />
            </div>

            <div className="min-w-0">
              <label
                htmlFor="event-area"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                Area
              </label>

              <input
                id="event-area"
                type="text"
                value={area}
                onChange={(event) =>
                  setArea(event.target.value)
                }
                placeholder="Garden"
                className={fieldClasses}
              />
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="event-start-time"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                Start time
              </label>

              <input
                id="event-start-time"
                type="time"
                value={startTime}
                onChange={(event) =>
                  setStartTime(
                    event.target.value,
                  )
                }
                className={fieldClasses}
              />
            </div>

            <div className="min-w-0">
              <label
                htmlFor="event-end-time"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                End time
              </label>

              <input
                id="event-end-time"
                type="time"
                value={endTime}
                onChange={(event) =>
                  setEndTime(
                    event.target.value,
                  )
                }
                className={fieldClasses}
              />
            </div>
          </div>

          <div className="min-w-0">
            <label
              htmlFor="required-staff"
              className="mb-1.5 block text-sm font-medium text-(--color-text)"
            >
              Required staff
            </label>

            <input
              id="required-staff"
              type="number"
              min={1}
              value={requiredStaffCount}
              onChange={(event) =>
                setRequiredStaffCount(
                  Number(event.target.value),
                )
              }
              className={fieldClasses}
            />
          </div>

          <div className="min-w-0">
            <p className="mb-2 text-sm font-medium text-(--color-text)">
              Assign event staff
            </p>

            {!date ? (
              <div className="rounded-xl border border-dashed border-(--color-border) bg-(--color-surface-soft) p-4">
                <p className="text-sm text-(--color-text-muted)">
                  Select the event date to
                  check staff availability.
                </p>
              </div>
            ) : (
              <EventStaffSelector
                staffList={staffList}
                availabilityList={
                  availabilityList
                }
                date={date}
                startTime={startTime}
                endTime={endTime}
                selectedStaffIds={
                  selectedStaffIds
                }
                onToggle={
                  handleStaffToggle
                }
              />
            )}

            <p className="mt-2 text-xs text-(--color-text-muted)">
              Selected:{" "}
              {selectedStaffIds.length} /{" "}
              {requiredStaffCount}
            </p>
          </div>

          <div className="min-w-0">
            <label
              htmlFor="event-instructions"
              className="mb-1.5 block text-sm font-medium text-(--color-text)"
            >
              Instructions
            </label>

            <textarea
              id="event-instructions"
              rows={4}
              value={instructions}
              onChange={(event) =>
                setInstructions(
                  event.target.value,
                )
              }
              placeholder="Setup and event instructions..."
              className={`${fieldClasses} min-h-28 resize-y`}
            />
          </div>

          {isEditing && (
            <div className="min-w-0">
              <label
                htmlFor="event-status"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                Status
              </label>

              <select
                id="event-status"
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target
                      .value as LocalHostEvent["status"],
                  )
                }
                className={`${fieldClasses} cursor-pointer`}
              >
                <option value="scheduled">
                  Scheduled
                </option>

                <option value="completed">
                  Completed
                </option>

                <option value="cancelled">
                  Cancelled
                </option>
              </select>
            </div>
          )}
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
            {isEditing
              ? "Save Changes"
              : "Add Event"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EventFormModal;