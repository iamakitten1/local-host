import type { Event as LocalHostEvent } from "../../../../types/event";
import type { Assignment } from "../../../../types/assignment";
import type { Staff } from "../../../../types/staff";

import { getStaffColor } from "./staffColors";

type ScheduleEventCardProps = {
  event: LocalHostEvent;
  assignments: Assignment[];
  staffList: Staff[];

  onEdit: (event: LocalHostEvent) => void;
  onDelete: (eventId: string) => void;
};

const getAssignmentLabel = (
  status: Assignment["status"],
) => {
  switch (status) {
    case "pending":
      return "Awaiting reply";

    case "confirmed":
      return "Confirmed";

    case "declined":
      return "Declined";

    case "cancellation-requested":
      return "Cancellation requested";

    case "cancelled":
      return "Cancelled";
  }
};

const getAssignmentStatusClasses = (
  status: Assignment["status"],
) => {
  switch (status) {
    case "confirmed":
      return "text-green-700";

    case "pending":
      return "text-amber-700";

    case "declined":
    case "cancelled":
      return "text-red-700";

    case "cancellation-requested":
      return "text-orange-700";
  }
};

const getOperationalStatus = (
  event: LocalHostEvent,
  assignments: Assignment[],
) => {
  if (event.status === "completed") {
    return {
      label: "Done",
      classes: "bg-green-100 text-green-700",
    };
  }

  if (event.status === "cancelled") {
    return {
      label: "Cancelled",
      classes: "bg-gray-200 text-gray-600",
    };
  }

  const activeAssignments =
    assignments.filter(
      (assignment) =>
        assignment.status !== "declined" &&
        assignment.status !== "cancelled",
    );

  const hasCancellationRequest =
    assignments.some(
      (assignment) =>
        assignment.status ===
        "cancellation-requested",
    );

  if (hasCancellationRequest) {
    return {
      label: "Needs review",
      classes:
        "bg-orange-100 text-orange-700",
    };
  }

  if (
    activeAssignments.length <
    event.requiredStaffCount
  ) {
    return {
      label: "Needs staff",
      classes: "bg-red-100 text-red-700",
    };
  }

  const hasPendingAssignment =
    assignments.some(
      (assignment) =>
        assignment.status === "pending",
    );

  if (hasPendingAssignment) {
    return {
      label: "Awaiting confirmation",
      classes:
        "bg-amber-100 text-amber-700",
    };
  }

  return {
    label: "Ready",
    classes:
      "bg-green-100 text-green-700",
  };
};

const ScheduleEventCard = ({
  event,
  assignments,
  staffList,
  onEdit,
  onDelete,
}: ScheduleEventCardProps) => {
  const assignedStaff = assignments
    .map((assignment) => {
      const member = staffList.find(
        (member) =>
          member.id === assignment.staffId,
      );

      if (!member) {
        return null;
      }

      return {
        member,
        assignment,
      };
    })
    .filter(
      (
        item,
      ): item is {
        member: Staff;
        assignment: Assignment;
      } => item !== null,
    );

  const primaryStaff =
    assignedStaff[0]?.member;

  const primaryColor = primaryStaff
    ? getStaffColor(primaryStaff.id)
    : getStaffColor("");

  const operationalStatus =
    getOperationalStatus(
      event,
      assignments,
    );

  return (
    <article
      className={`min-w-0 overflow-hidden rounded-xl border ${primaryColor.border} ${primaryColor.background}`}
    >
      <div className="flex min-w-0 flex-col sm:flex-row">
        {/* Time */}
        <div className="flex shrink-0 items-center border-b border-black/5 px-4 py-3 sm:w-24 sm:flex-col sm:items-center sm:justify-start sm:border-r sm:border-b-0 sm:px-3 sm:py-4">
          <span className="text-sm font-semibold text-gray-700">
            {event.startTime}
          </span>

          <span className="mx-1 text-xs text-gray-400 sm:mx-0">
            –
          </span>

          <span className="text-xs text-gray-500">
            {event.endTime}
          </span>
        </div>

        {/* Main content */}
        <div className="min-w-0 flex-1 p-4">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex min-w-0 items-start gap-2">
                {/* Staff colors */}
                <div className="mt-1 flex shrink-0 -space-x-1">
                  {assignedStaff.map(
                    ({ member }) => {
                      const color =
                        getStaffColor(
                          member.id,
                        );

                      return (
                        <span
                          key={member.id}
                          title={`${member.firstName} ${member.lastName}`}
                          className={`h-3 w-3 rounded-full border-2 border-white ${color.dot}`}
                        />
                      );
                    },
                  )}

                  {assignedStaff.length ===
                    0 && (
                    <span className="h-3 w-3 rounded-full bg-gray-300" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Event
                  </p>

                  <h3
                    className={`wrap-break-word font-semibold ${primaryColor.text}`}
                  >
                    {event.title}
                  </h3>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
                {event.area && (
                  <span>{event.area}</span>
                )}

                <span>
                  Staff:{" "}
                  {
                    assignments.filter(
                      (assignment) =>
                        assignment.status !==
                          "declined" &&
                        assignment.status !==
                          "cancelled",
                    ).length
                  }{" "}
                  / {event.requiredStaffCount}
                </span>
              </div>
            </div>

            {/* One main status */}
            <span
              className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${operationalStatus.classes}`}
            >
              {operationalStatus.label}
            </span>
          </div>

          {/* Assignees */}
          <div className="mt-3 space-y-1.5">
            {assignedStaff.length > 0 ? (
              assignedStaff.map(
                ({
                  member,
                  assignment,
                }) => (
                  <div
                    key={assignment.id}
                    className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 text-sm"
                  >
                    <span className="wrap-break-word font-medium text-gray-700">
                      {
                        member.firstName
                      }{" "}
                      {
                        member.lastName
                      }
                    </span>

                    <span
                      className={`text-xs font-medium ${getAssignmentStatusClasses(
                        assignment.status,
                      )}`}
                    >
                      ·{" "}
                      {getAssignmentLabel(
                        assignment.status,
                      )}
                    </span>
                  </div>
                ),
              )
            ) : (
              <p className="text-sm text-gray-500">
                No staff assigned
              </p>
            )}
          </div>

          {/* Instructions */}
          {event.instructions && (
            <p className="mt-3 wrap-break-word line-clamp-2 text-sm text-gray-500">
              {event.instructions}
            </p>
          )}

          {/* Actions */}
          <div className="mt-4 flex gap-2 border-t border-black/5 pt-3 sm:justify-end">
            <button
              type="button"
              onClick={() =>
                onEdit(event)
              }
              className="flex-1 cursor-pointer rounded-md px-3 py-2 text-xs font-medium text-gray-600 hover:bg-white/70 sm:flex-none"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() =>
                onDelete(event.id)
              }
              className="flex-1 cursor-pointer rounded-md px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 sm:flex-none"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ScheduleEventCard;