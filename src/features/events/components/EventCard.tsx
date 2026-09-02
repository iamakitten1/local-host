import type { Event as LocalHostEvent } from "../../../types/event";
import type { Assignment } from "../../../types/assignment";
import type { Staff } from "../../../types/staff";

type EventCardProps = {
  event: LocalHostEvent;
  assignments: Assignment[];
  staffList: Staff[];
};

const EventCard = ({
  event,
  assignments,
  staffList,
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

  const assignedStaff = activeAssignments
    .map((assignment) => {
      const member = staffList.find(
        (staff) =>
          staff.id === assignment.staffId,
      );

      return member
        ? `${member.firstName} ${member.lastName}`
        : null;
    })
    .filter(Boolean);

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
            {event.startTime} –{" "}
            {event.endTime}
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

          {assignedStaff.length > 0 && (
            <p className="mt-3 wrap-break-word text-sm text-gray-600">
              {assignedStaff.join(", ")}
            </p>
          )}

          {needsMoreStaff && (
            <p className="mt-2 text-xs font-medium text-orange-600">
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
      </div>
    </article>
  );
};

export default EventCard;