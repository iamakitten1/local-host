import {
  Clock3,
  Sparkles,
  UserRound,
} from "lucide-react";

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
      return "bg-emerald-50 text-emerald-700";

    case "declined":
    case "cancelled":
      return "bg-red-50 text-red-700";

    case "cancellation-requested":
      return "bg-orange-50 text-orange-700";

    case "pending":
      return "bg-amber-50 text-amber-700";
  }
};

const getTaskStatusClasses = (
  status: WorkTask["status"],
) => {
  switch (status) {
    case "pending":
      return "bg-amber-50 text-amber-700";

    case "in-progress":
      return "bg-sky-50 text-sky-700";

    case "completed":
      return "bg-emerald-50 text-emerald-700";

    case "cancelled":
      return "bg-gray-100 text-gray-600";
  }
};

const getTaskStatusLabel = (
  status: WorkTask["status"],
) => {
  switch (status) {
    case "pending":
      return "Pending";

    case "in-progress":
      return "In progress";

    case "completed":
      return "Completed";

    case "cancelled":
      return "Cancelled";
  }
};

const CleaningOverview = ({
  tasks,
  assignments,
}: CleaningOverviewProps) => {
  return (
    <section className="mt-8 min-w-0">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#5b7e72]">
            Operations
          </p>

          <h2 className="mt-1 text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
            Cleaning
          </h2>
        </div>

        <span className="rounded-full bg-[#edf3ef] px-2.5 py-1 text-xs font-semibold text-[#3f6f60]">
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d9d7d0] bg-white/60 p-5 text-sm text-gray-500">
          No pending cleaning tasks.
        </div>
      ) : (
        <div className="grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-2">
          {tasks.map((task) => {
            const room = rooms.find(
              (room) =>
                room.id === task.roomId,
            );

            const assignment =
              assignments.find(
                (assignment) =>
                  assignment.sourceType ===
                    "work-task" &&
                  assignment.sourceId ===
                    task.id,
              );

            const assignedStaff =
              assignment
                ? staff.find(
                    (person) =>
                      person.id ===
                      assignment.staffId,
                  )
                : undefined;

            return (
              <article
                key={task.id}
                className="min-w-0 rounded-2xl border border-[#e7e5df] bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#edf3ef] text-[#3f6f60]">
                      <Sparkles
                        size={18}
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="wrap-break-word font-semibold text-gray-900">
                        {room?.name ??
                          task.title}
                      </p>

                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                        <span>{task.date}</span>

                        {task.startTime && (
                          <span className="flex items-center gap-1">
                            <Clock3
                              size={13}
                              strokeWidth={1.8}
                              aria-hidden="true"
                            />

                            {task.startTime}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${getTaskStatusClasses(
                      task.status,
                    )}`}
                  >
                    {getTaskStatusLabel(
                      task.status,
                    )}
                  </span>
                </div>

                <div className="mt-4 border-t border-[#efede7] pt-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-2 text-sm text-gray-600">
                      <UserRound
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />

                      <span className="truncate">
                        {assignedStaff
                          ? `${assignedStaff.firstName} ${assignedStaff.lastName}`
                          : "Unassigned"}
                      </span>
                    </div>

                    <span
                      className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${getAssignmentClasses(
                        assignment,
                      )}`}
                    >
                      {getAssignmentLabel(
                        assignment,
                      )}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CleaningOverview;