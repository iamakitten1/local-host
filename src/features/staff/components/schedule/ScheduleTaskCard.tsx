import type { Staff } from "../../../../types/staff";
import type { WorkTask } from "../../../../types/workTask";
import type { Assignment } from "../../../../types/assignment";

import { getStaffColor } from "./staffColors";

type ScheduleTaskCardProps = {
  task: WorkTask;
  assignments: Assignment[];
  staffList: Staff[];

  onEdit: (task: WorkTask) => void;
  onDelete: (taskId: string) => void;
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
  task: WorkTask,
  assignments: Assignment[],
) => {
  if (task.status === "completed") {
    return {
      label: "Done",
      classes: "bg-green-100 text-green-700",
    };
  }

  if (task.status === "in-progress") {
    return {
      label: "In progress",
      classes: "bg-blue-100 text-blue-700",
    };
  }

  if (task.status === "cancelled") {
    return {
      label: "Cancelled",
      classes: "bg-gray-200 text-gray-600",
    };
  }

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

  const hasStaffingProblem =
    assignments.some(
      (assignment) =>
        assignment.status ===
          "declined" ||
        assignment.status ===
          "cancelled",
    );

  if (hasStaffingProblem) {
    return {
      label: "Staffing issue",
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

  const hasConfirmedAssignment =
    assignments.some(
      (assignment) =>
        assignment.status ===
        "confirmed",
    );

  if (hasConfirmedAssignment) {
    return {
      label: "Ready",
      classes:
        "bg-green-100 text-green-700",
    };
  }

  return {
    label: "Unassigned",
    classes: "bg-gray-100 text-gray-600",
  };
};

const ScheduleTaskCard = ({
  task,
  assignments,
  staffList,
  onEdit,
  onDelete,
}: ScheduleTaskCardProps) => {
  const assignedStaff = assignments
    .map((assignment) => {
      const member = staffList.find(
        (member) =>
          member.id ===
          assignment.staffId,
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
      task,
      assignments,
    );

  return (
    <article
      className={`min-w-0 overflow-hidden rounded-xl border ${primaryColor.border} ${primaryColor.background}`}
    >
      <div className="flex min-w-0 flex-col sm:flex-row">
        {/* Time */}
        <div className="flex shrink-0 items-center border-b border-black/5 px-4 py-3 sm:w-20 sm:items-start sm:justify-center sm:border-r sm:border-b-0 sm:px-3 sm:py-4">
          <span className="text-sm font-semibold text-gray-700">
            {task.startTime ?? "—"}
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

                <h3
                  className={`min-w-0 wrap-break-word font-semibold ${primaryColor.text}`}
                >
                  {task.title}
                </h3>
              </div>

              {/* Area + priority */}
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
                {task.area && (
                  <span>
                    {task.area}
                  </span>
                )}

                {task.priority !==
                  "normal" && (
                  <span className="font-semibold capitalize">
                    {task.priority}
                  </span>
                )}
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
          {task.instructions && (
            <p className="mt-3 wrap-break-word line-clamp-2 text-sm text-gray-500">
              {task.instructions}
            </p>
          )}

          {/* Actions */}
          <div className="mt-4 flex gap-2 border-t border-black/5 pt-3 sm:justify-end">
            <button
              type="button"
              onClick={() =>
                onEdit(task)
              }
              className="flex-1 cursor-pointer rounded-md px-3 py-2 text-xs font-medium text-gray-600 hover:bg-white/70 sm:flex-none"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() =>
                onDelete(task.id)
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

export default ScheduleTaskCard;