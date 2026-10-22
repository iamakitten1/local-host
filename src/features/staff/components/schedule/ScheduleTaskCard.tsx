import type { Staff } from "../../../../types/staff";
import type { WorkTask } from "../../../../types/workTask";
import type { Assignment } from "../../../../types/assignment";

import AssignmentReviewActions from "../../../assignments/components/AssignmentReviewActions";

import { getStaffColor } from "./staffColors";

type ScheduleTaskCardProps = {
  task: WorkTask;
  assignments: Assignment[];
  staffList: Staff[];

  onEdit: (task: WorkTask) => void;
  onDelete: (taskId: string) => void;

  onApproveCancellation: (
    assignment: Assignment,
  ) => void;

  onRejectCancellation: (
    assignment: Assignment,
  ) => void;
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
      classes:
        "bg-green-100 text-green-700",
    };
  }

  if (task.status === "in-progress") {
    return {
      label: "In progress",
      classes:
        "bg-blue-100 text-blue-700",
    };
  }

  if (task.status === "cancelled") {
    return {
      label: "Cancelled",
      classes:
        "bg-gray-200 text-gray-600",
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
      classes:
        "bg-red-100 text-red-700",
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
    classes:
      "bg-(--color-surface-soft) text-(--color-text-muted)",
  };
};

const ScheduleTaskCard = ({
  task,
  assignments,
  staffList,
  onEdit,
  onDelete,
  onApproveCancellation,
  onRejectCancellation,
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
    <article className="min-w-0 overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-sm">
      <div className="flex min-w-0 flex-col sm:flex-row">
        <div className="flex shrink-0 items-center border-b border-(--color-border) bg-(--color-surface-soft) px-4 py-3 sm:w-20 sm:items-start sm:justify-center sm:border-r sm:border-b-0 sm:px-3 sm:py-4">
          <span className="text-sm font-semibold text-(--color-text)">
            {task.startTime ?? "—"}
          </span>
        </div>

        <div className="min-w-0 flex-1 p-4">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex min-w-0 items-start gap-2">
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
                          className={`size-3 rounded-full border-2 border-white ${color.dot}`}
                        />
                      );
                    },
                  )}

                  {assignedStaff.length ===
                    0 && (
                    <span className="size-3 rounded-full bg-gray-300" />
                  )}
                </div>

                <h3 className={`min-w-0 font-semibold ${primaryColor.text}`}>
                  {task.title}
                </h3>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-(--color-text-muted)">
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

            <span
              className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${operationalStatus.classes}`}
            >
              {operationalStatus.label}
            </span>
          </div>

          <div className="mt-3 space-y-3">
            {assignedStaff.length > 0 ? (
              assignedStaff.map(
                ({
                  member,
                  assignment,
                }) => (
                  <div
                    key={assignment.id}
                    className="min-w-0"
                  >
                    <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
                      <span className="font-medium text-(--color-text)">
                        {member.firstName}{" "}
                        {member.lastName}
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

                    <AssignmentReviewActions
                      assignment={
                        assignment
                      }
                      onApprove={
                        onApproveCancellation
                      }
                      onReject={
                        onRejectCancellation
                      }
                    />
                  </div>
                ),
              )
            ) : (
              <p className="text-sm text-(--color-text-muted)">
                No staff assigned
              </p>
            )}
          </div>

          {task.instructions && (
            <p className="mt-3 line-clamp-2 text-sm text-(--color-text-muted)">
              {task.instructions}
            </p>
          )}

          <div className="mt-4 flex gap-2 border-t border-(--color-border) pt-3 sm:justify-end">
            <button
              type="button"
              onClick={() =>
                onEdit(task)
              }
              className="flex-1 cursor-pointer rounded-xl px-3 py-2 text-xs font-medium text-(--color-text-muted) transition hover:bg-(--color-surface-soft) hover:text-(--color-text) sm:flex-none"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() =>
                onDelete(task.id)
              }
              className="flex-1 cursor-pointer rounded-xl px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 sm:flex-none"
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