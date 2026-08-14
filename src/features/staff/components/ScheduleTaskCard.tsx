import { staff } from "../../../data/staff";
import type { WorkTask } from "../../../types/workTask";

type ScheduleTaskCardProps = {
  task: WorkTask;
};

const ScheduleTaskCard = ({ task }: ScheduleTaskCardProps) => {
  const assignedStaff = staff.filter((member) =>
    task.assignedStaffIds.includes(member.id),
  );

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {task.startTime ?? "No time"}
          </p>

          <h3 className="mt-1 text-lg font-semibold text-gray-900">
            {task.title}
          </h3>

          {task.area && (
            <p className="mt-1 text-sm text-gray-500">
              {task.area}
            </p>
          )}
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
          {task.status}
        </span>
      </div>

      {task.instructions && (
        <div className="mt-4 rounded-lg bg-gray-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Instructions
          </p>

          <p className="mt-1 whitespace-pre-line text-sm text-gray-700">
            {task.instructions}
          </p>
        </div>
      )}

      <div className="mt-4">
        <p className="text-xs font-medium text-gray-500">
          Assigned staff
        </p>

        <p className="mt-1 text-sm font-medium text-gray-800">
          {assignedStaff.length > 0
            ? assignedStaff
                .map(
                  (member) =>
                    `${member.firstName} ${member.lastName}`,
                )
                .join(", ")
            : "Unassigned"}
        </p>
      </div>
    </article>
  );
};

export default ScheduleTaskCard;