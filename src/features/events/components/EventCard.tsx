import {
  CalendarDays,
  Clock3,
  MapPin,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

import type { Event as LocalHostEvent } from "../../../types/event";
import type { Assignment } from "../../../types/assignment";
import type { Staff } from "../../../types/staff";

type EventCardProps = {
  event: LocalHostEvent;
  assignments: Assignment[];
  staffList: Staff[];
  onEdit: (event: LocalHostEvent) => void;
  onDelete: (eventId: string) => void;
};

const getAssignmentStatus = (
  status: Assignment["status"],
) => {
  switch (status) {
    case "confirmed":
      return {
        label: "Confirmed",
        className: "text-green-700",
      };

    case "pending":
      return {
        label: "Awaiting reply",
        className: "text-amber-700",
      };

    case "declined":
      return {
        label: "Declined",
        className: "text-red-600",
      };

    case "cancellation-requested":
      return {
        label: "Cancellation requested",
        className: "text-orange-600",
      };

    case "cancelled":
      return {
        label: "Cancelled",
        className: "text-gray-500",
      };
  }
};

const getEventStatusClasses = (
  status: LocalHostEvent["status"],
) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700";

    case "cancelled":
      return "bg-gray-100 text-gray-600";

    case "scheduled":
      return "bg-(--color-primary-soft) text-(--color-primary)";
  }
};

const EventCard = ({
  event,
  assignments,
  staffList,
  onEdit,
  onDelete,
}: EventCardProps) => {
  const activeAssignments = assignments.filter(
    (assignment) =>
      assignment.status !== "cancelled" &&
      assignment.status !== "declined",
  );

  const confirmedCount = assignments.filter(
    (assignment) =>
      assignment.status === "confirmed",
  ).length;

  const pendingCount = assignments.filter(
    (assignment) =>
      assignment.status === "pending",
  ).length;

  const needsMoreStaff =
    activeAssignments.length <
    event.requiredStaffCount;

  return (
    <article className="min-w-0 rounded-3xl border border-(--color-border) bg-(--color-surface) p-5 shadow-sm">
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div className="flex min-w-0 gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-(--color-primary-soft) text-(--color-primary)">
            <CalendarDays
              size={19}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
              Event
            </p>

            <h2 className="mt-1 text-lg font-semibold tracking-tight text-(--color-text)">
              {event.title}
            </h2>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-(--color-text-muted)">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays
                  size={14}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                {event.date}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Clock3
                  size={14}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                {event.startTime} – {event.endTime}
              </span>

              {event.area && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin
                    size={14}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />

                  {event.area}
                </span>
              )}
            </div>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${getEventStatusClasses(
            event.status,
          )}`}
        >
          {event.status}
        </span>
      </div>

      <div className="mt-5 rounded-2xl border border-(--color-border) bg-(--color-surface-soft) p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Users
              size={17}
              strokeWidth={1.8}
              className="text-(--color-primary)"
              aria-hidden="true"
            />

            <p className="text-sm font-semibold text-(--color-text)">
              Staffing
            </p>
          </div>

          <span
            className={`text-sm font-semibold ${
              needsMoreStaff
                ? "text-orange-600"
                : "text-green-700"
            }`}
          >
            {activeAssignments.length} /{" "}
            {event.requiredStaffCount}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-(--color-text-muted)">
          <span>
            Confirmed: {confirmedCount}
          </span>

          <span>
            Awaiting reply: {pendingCount}
          </span>
        </div>

        {assignments.length > 0 ? (
          <div className="mt-4 space-y-2">
            {assignments.map((assignment) => {
              const member = staffList.find(
                (staff) =>
                  staff.id === assignment.staffId,
              );

              const status =
                getAssignmentStatus(
                  assignment.status,
                );

              return (
                <div
                  key={assignment.id}
                  className="flex min-w-0 flex-col gap-1 border-t border-(--color-border) pt-2 first:border-t-0 first:pt-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="min-w-0 text-sm font-medium text-(--color-text)">
                    {member
                      ? `${member.firstName} ${member.lastName}`
                      : "Unknown staff"}
                  </p>

                  <span
                    className={`shrink-0 text-xs font-medium ${status.className}`}
                  >
                    {status.label}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-4 text-sm text-(--color-text-muted)">
            No staff assigned
          </p>
        )}

        {needsMoreStaff && (
          <p className="mt-3 text-xs font-semibold text-orange-600">
            More staff needed
          </p>
        )}
      </div>

      {event.instructions && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
            Instructions
          </p>

          <p className="mt-2 text-sm leading-6 text-(--color-text-muted)">
            {event.instructions}
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-2 border-t border-(--color-border) pt-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => onEdit(event)}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-(--color-border-strong) px-3 py-2 text-sm font-medium text-(--color-text) transition hover:bg-(--color-surface-soft) sm:w-auto"
        >
          <Pencil
            size={15}
            strokeWidth={1.9}
            aria-hidden="true"
          />

          Edit
        </button>

        <button
          type="button"
          onClick={() => {
            const shouldDelete =
              window.confirm(
                `Delete "${event.title}"?`,
              );

            if (shouldDelete) {
              onDelete(event.id);
            }
          }}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:w-auto"
        >
          <Trash2
            size={15}
            strokeWidth={1.9}
            aria-hidden="true"
          />

          Delete
        </button>
      </div>
    </article>
  );
};

export default EventCard;