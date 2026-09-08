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

const EventCard = ({
  event,
  assignments,
  staffList,
  onEdit,
  onDelete,
}: EventCardProps) => {
  const activeAssignments =
    assignments.filter(
      (assignment) =>
        assignment.status !== "cancelled" &&
        assignment.status !== "declined",
    );

  const confirmedCount =
    assignments.filter(
      (assignment) =>
        assignment.status === "confirmed",
    ).length;

  const pendingCount =
    assignments.filter(
      (assignment) =>
        assignment.status === "pending",
    ).length;

  const needsMoreStaff =
    activeAssignments.length <
    event.requiredStaffCount;

  return (
    <article className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="wrap-break-word text-lg font-semibold text-gray-900">
              {event.title}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {event.date}
            </p>
          </div>

          <span className="w-fit shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
            {event.status}
          </span>
        </div>

        <div className="space-y-1 text-sm text-gray-600">
          <p>
            {event.startTime} – {event.endTime}
          </p>

          {event.area && (
            <p className="wrap-break-word">
              {event.area}
            </p>
          )}
        </div>

        <div className="rounded-lg bg-gray-50 p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium text-gray-900">
              Staffing
            </p>

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

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
            <span>
              Confirmed: {confirmedCount}
            </span>

            <span>
              Awaiting reply: {pendingCount}
            </span>
          </div>

          {assignments.length > 0 ? (
            <div className="mt-3 space-y-2">
              {assignments.map(
                (assignment) => {
                  const member =
                    staffList.find(
                      (staff) =>
                        staff.id ===
                        assignment.staffId,
                    );

                  const status =
                    getAssignmentStatus(
                      assignment.status,
                    );

                  return (
                    <div
                      key={assignment.id}
                      className="flex min-w-0 flex-col gap-1 border-t border-gray-200 pt-2 first:border-t-0 first:pt-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <p className="min-w-0 wrap-break-word text-sm font-medium text-gray-700">
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
                },
              )}
            </div>
          ) : (
            <p className="mt-3 text-sm text-gray-500">
              No staff assigned
            </p>
          )}

          {needsMoreStaff && (
            <p className="mt-3 text-xs font-medium text-orange-600">
              More staff needed
            </p>
          )}
        </div>

        {event.instructions && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Instructions
            </p>

            <p className="mt-1 wrap-break-word text-sm text-gray-600">
              {event.instructions}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => onEdit(event)}
            className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(event.id)}
            className="w-full cursor-pointer rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 sm:w-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default EventCard;