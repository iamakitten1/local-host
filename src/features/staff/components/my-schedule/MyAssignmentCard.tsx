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

  onAccept: (assignment: Assignment) => void;
  onDecline: (assignment: Assignment) => void;
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
  onAccept,
  onDecline,
  onRequestCancellation,
}: MyAssignmentCardProps) => {
  const status =
    getStatusStyles(assignment.status);

  return (
    <article className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              {sourceLabel}
            </p>

            <h3 className="mt-1 wrap-break-word text-lg font-semibold text-gray-900">
              {title}
            </h3>
          </div>

          <span
            className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${status.classes}`}
          >
            {status.label}
          </span>
        </div>

        <div className="space-y-1 text-sm text-gray-600">
          <p>{date}</p>

          {startTime && (
            <p>
              {startTime}
              {endTime
                ? ` – ${endTime}`
                : ""}
            </p>
          )}

          {area && (
            <p className="wrap-break-word">
              {area}
            </p>
          )}
        </div>

        {instructions && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Instructions
            </p>

            <p className="mt-1 wrap-break-word text-sm text-gray-600">
              {instructions}
            </p>
          </div>
        )}

        {assignment.status ===
          "declined" &&
          assignment.declineReason && (
            <div className="rounded-lg bg-red-50 p-3">
              <p className="text-xs font-medium text-red-700">
                Decline reason
              </p>

              <p className="mt-1 wrap-break-word text-sm text-red-700">
                {
                  assignment.declineReason
                }
              </p>
            </div>
          )}

        {assignment.status ===
          "cancellation-requested" &&
          assignment.cancellationReason && (
            <div className="rounded-lg bg-orange-50 p-3">
              <p className="text-xs font-medium text-orange-700">
                Cancellation reason
              </p>

              <p className="mt-1 wrap-break-word text-sm text-orange-700">
                {
                  assignment.cancellationReason
                }
              </p>
            </div>
          )}

        {assignment.status ===
          "pending" && (
          <div className="flex flex-col gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() =>
                onDecline(assignment)
              }
              className="w-full cursor-pointer rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 sm:w-auto"
            >
              Decline
            </button>

            <button
              type="button"
              onClick={() =>
                onAccept(assignment)
              }
              className="w-full cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto"
            >
              Accept
            </button>
          </div>
        )}

        {assignment.status ===
          "confirmed" && (
          <div className="border-t border-gray-100 pt-4 sm:text-right">
            <button
              type="button"
              onClick={() =>
                onRequestCancellation(
                  assignment,
                )
              }
              className="w-full cursor-pointer rounded-lg border border-orange-200 px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-50 sm:w-auto"
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