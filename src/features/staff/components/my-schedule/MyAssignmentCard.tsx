import type { ReactNode } from "react";

import type { Assignment } from "../../../../types/assignment";

type MyAssignmentCardProps = {
  assignment: Assignment;

  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  sourceLabel: "Task" | "Event";
  area?: string;
  instructions?: string;

  workControls?: ReactNode;

  onAccept: (assignment: Assignment) => void;

  onDecline: (
    assignment: Assignment,
  ) => void;

  onRequestCancellation: (
    assignment: Assignment,
  ) => void;
};

const getStatusStyles = (
  status: Assignment["status"],
) => {
  switch (status) {
    case "pending":
      return {
        label: "Awaiting reply",
        classes:
          "bg-amber-100 text-amber-700",
      };

    case "confirmed":
      return {
        label: "Confirmed",
        classes:
          "bg-green-100 text-green-700",
      };

    case "declined":
      return {
        label: "Declined",
        classes:
          "bg-red-100 text-red-700",
      };

    case "cancellation-requested":
      return {
        label: "Cancellation requested",
        classes:
          "bg-orange-100 text-orange-700",
      };

    case "cancelled":
      return {
        label: "Cancelled",
        classes:
          "bg-gray-200 text-gray-600",
      };
  }
};

const MyAssignmentCard = ({
  assignment,
  title,
  date,
  startTime,
  endTime,
  sourceLabel,
  area,
  instructions,
  workControls,
  onAccept,
  onDecline,
  onRequestCancellation,
}: MyAssignmentCardProps) => {
  const status =
    getStatusStyles(assignment.status);

  return (
    <article className="min-w-0 rounded-2xl border border-(--color-border) bg-(--color-surface) p-4 shadow-sm sm:p-5">
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
              {sourceLabel}
            </p>

            <h3 className="mt-1 text-lg font-semibold text-(--color-text)">
              {title}
            </h3>
          </div>

          <span
            className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${status.classes}`}
          >
            {status.label}
          </span>
        </div>

        <div className="rounded-xl bg-(--color-surface-soft) p-3 text-sm text-(--color-text-muted)">
          <p className="font-medium text-(--color-text)">
            {date}
          </p>

          {startTime && (
            <p className="mt-1">
              {startTime}
              {endTime
                ? ` – ${endTime}`
                : ""}
            </p>
          )}

          {area && (
            <p className="mt-1">
              {area}
            </p>
          )}
        </div>

        {instructions && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
              Instructions
            </p>

            <p className="mt-1 text-sm text-(--color-text-muted)">
              {instructions}
            </p>
          </div>
        )}

        {workControls}

        {assignment.status ===
          "declined" &&
          assignment.declineReason && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3">
              <p className="text-xs font-semibold text-red-700">
                Decline reason
              </p>

              <p className="mt-1 text-sm text-red-700">
                {assignment.declineReason}
              </p>
            </div>
          )}

        {assignment.status ===
          "cancellation-requested" &&
          assignment.cancellationReason && (
            <div className="rounded-xl border border-orange-200 bg-orange-50 p-3">
              <p className="text-xs font-semibold text-orange-700">
                Cancellation reason
              </p>

              <p className="mt-1 text-sm text-orange-700">
                {
                  assignment.cancellationReason
                }
              </p>
            </div>
          )}

        {assignment.status ===
          "pending" && (
          <div className="flex flex-col gap-2 border-t border-(--color-border) pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() =>
                onDecline(assignment)
              }
              className="w-full cursor-pointer rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:w-auto"
            >
              Decline
            </button>

            <button
              type="button"
              onClick={() =>
                onAccept(assignment)
              }
              className="w-full cursor-pointer rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) sm:w-auto"
            >
              Accept
            </button>
          </div>
        )}

        {assignment.status ===
          "confirmed" && (
          <div className="border-t border-(--color-border) pt-4 sm:text-right">
            <button
              type="button"
              onClick={() =>
                onRequestCancellation(
                  assignment,
                )
              }
              className="w-full cursor-pointer rounded-xl border border-orange-200 px-4 py-2.5 text-sm font-medium text-orange-700 transition hover:bg-orange-50 sm:w-auto"
            >
              Request cancellation
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default MyAssignmentCard;