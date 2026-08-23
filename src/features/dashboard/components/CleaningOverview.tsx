import type { WorkTask } from "../../../types/workTask";
import type { Assignment } from "../../../types/assignment";

import { rooms } from "../../../data/rooms";
import { staff } from "../../../data/staff";

type CleaningOverviewProps = {
  tasks: WorkTask[];
  assignments: Assignment[];
};

const getAssignmentLabel = (
  assignment?: Assignment,
) => {
  if (!assignment) {
    return "Unassigned";
  }

  switch (assignment.status) {
    case "pending":
      return "Pending confirmation";

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

const getAssignmentClasses = (
  assignment?: Assignment,
) => {
  if (!assignment) {
    return "bg-gray-100 text-gray-600";
  }

  switch (assignment.status) {
    case "confirmed":
      return "bg-green-100 text-green-700";

    case "declined":
    case "cancelled":
      return "bg-red-100 text-red-700";

    case "cancellation-requested":
      return "bg-orange-100 text-orange-700";

    case "pending":
      return "bg-amber-100 text-amber-700";
  }
};

const CleaningOverview = ({
  tasks,
  assignments,
}: CleaningOverviewProps) => {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Cleaning
      </h2>

      <div className="space-y-3">
        {tasks.map((task) => {
          const room = rooms.find(
            (room) => room.id === task.roomId,
          );

          const assignment =
            assignments.find(
              (assignment) =>
                assignment.sourceType === "work-task" &&
                assignment.sourceId === task.id,
            );

          const assignedStaff =
            assignment
              ? staff.find(
                  (person) =>
                    person.id === assignment.staffId,
                )
              : undefined;

          return (
            <div
              key={task.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900">
                    {room?.name ?? task.title}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {task.date}

                    {task.startTime &&
                      ` • ${task.startTime}`}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getAssignmentClasses(
                    assignment,
                  )}`}
                >
                  {getAssignmentLabel(
                    assignment,
                  )}
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-600">
                Cleaner:{" "}
                <span className="font-medium text-gray-900">
                  {assignedStaff
                    ? `${assignedStaff.firstName} ${assignedStaff.lastName}`
                    : "Unassigned"}
                </span>
              </p>

              <span
                className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  task.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : task.status === "in-progress"
                      ? "bg-blue-100 text-blue-700"
                      : task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                }`}
              >
                {task.status === "pending"
                  ? "Pending"
                  : task.status === "in-progress"
                    ? "In Progress"
                    : task.status === "completed"
                      ? "Completed"
                      : "Cancelled"}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CleaningOverview;