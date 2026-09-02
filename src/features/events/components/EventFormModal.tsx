import { useState } from "react";

import Modal from "../../../components/ui/Modal";

import type { Event as LocalHostEvent } from "../../../types/event";
import type { Staff } from "../../../types/staff";

type EventFormModalProps = {
  event?: LocalHostEvent;
  staffList: Staff[];
  initialStaffIds?: string[];
  onClose: () => void;
  onSubmit: (
    event: LocalHostEvent,
    selectedStaffIds: string[],
  ) => void;
};

const EventFormModal = ({
  event,
  staffList,
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
  ] = useState<string[]>(
    initialStaffIds,
  );

  const [error, setError] = useState("");

  const eligibleStaff = staffList.filter(
    (member) =>
      member.isActive &&
      member.role !== "owner" &&
      member.workTypes.includes("event"),
  );

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
        className="min-w-0 p-4 sm:p-5"
      >
        <div className="space-y-5">
          <div className="min-w-0">
            <label
              htmlFor="event-title"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Event title
            </label>

            <input
              id="event-title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value,
                )
              }
              placeholder="Birthday Party"
              className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
            />
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="event-date"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Date
              </label>

              <input
                id="event-date"
                type="date"
                value={date}
                onChange={(event) =>
                  setDate(
                    event.target.value,
                  )
                }
                className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
              />
            </div>

            <div className="min-w-0">
              <label
                htmlFor="event-area"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Area
              </label>

              <input
                id="event-area"
                type="text"
                value={area}
                onChange={(event) =>
                  setArea(
                    event.target.value,
                  )
                }
                placeholder="Garden"
                className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
              />
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="event-start-time"
                className="mb-1 block text-sm font-medium text-gray-700"
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
                className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
              />
            </div>

            <div className="min-w-0">
              <label
                htmlFor="event-end-time"
                className="mb-1 block text-sm font-medium text-gray-700"
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
                className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
              />
            </div>
          </div>

          <div className="min-w-0">
            <label
              htmlFor="required-staff"
              className="mb-1 block text-sm font-medium text-gray-700"
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
                  Number(
                    event.target.value,
                  ),
                )
              }
              className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
            />
          </div>

          <div className="min-w-0">
            <p className="mb-2 text-sm font-medium text-gray-700">
              Assign event staff
            </p>

            {eligibleStaff.length === 0 ? (
              <p className="text-sm text-gray-500">
                No active event staff
                available.
              </p>
            ) : (
              <div className="space-y-2">
                {eligibleStaff.map(
                  (member) => (
                    <label
                      key={member.id}
                      className="flex min-w-0 cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStaffIds.includes(
                          member.id,
                        )}
                        onChange={() =>
                          handleStaffToggle(
                            member.id,
                          )
                        }
                        className="mt-1"
                      />

                      <span className="min-w-0">
                        <span className="block wrap-break-word text-sm font-medium text-gray-900">
                          {
                            member.firstName
                          }{" "}
                          {
                            member.lastName
                          }
                        </span>

                        <span className="block text-xs capitalize text-gray-500">
                          {member.role}
                        </span>
                      </span>
                    </label>
                  ),
                )}
              </div>
            )}

            <p className="mt-2 text-xs text-gray-500">
              Selected:{" "}
              {selectedStaffIds.length} /{" "}
              {requiredStaffCount}
            </p>
          </div>

          <div className="min-w-0">
            <label
              htmlFor="event-instructions"
              className="mb-1 block text-sm font-medium text-gray-700"
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
              className="w-full min-w-0 resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
            />
          </div>

          {isEditing && (
            <div className="min-w-0">
              <label
                htmlFor="event-status"
                className="mb-1 block text-sm font-medium text-gray-700"
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
                className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
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

          {error && (
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
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