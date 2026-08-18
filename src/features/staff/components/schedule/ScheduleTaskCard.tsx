import type { Staff } from "../../../../types/staff";
import type { WorkTask } from "../../../../types/workTask";
import { getStaffColor } from "./staffColors";

type ScheduleTaskCardProps = {
  task: WorkTask;
  staffList: Staff[];
  onEdit: (task: WorkTask) => void;
  onDelete: (taskId: string) => void;
};

const ScheduleTaskCard = ({
  task,
  staffList,
  onEdit,
  onDelete,
}: ScheduleTaskCardProps) => {
  const assignedStaff = staffList.filter((member) =>
    task.assignedStaffIds.includes(member.id),
  );

  const primaryStaff = assignedStaff[0];

  const primaryColor = primaryStaff
    ? getStaffColor(primaryStaff.id)
    : getStaffColor("");

  return (
    <article
      className={`overflow-hidden rounded-xl border ${primaryColor.border} ${primaryColor.background}`}
    >
      <div className="flex min-h-28">
        {/* Time */}
        <div className="flex w-20 shrink-0 items-start justify-center border-r border-black/5 px-3 py-4">
          <span className="text-sm font-semibold text-gray-700">
            {task.startTime ?? "—"}
          </span>
        </div>

        {/* Main task information */}
        <div className="min-w-0 flex-1 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {/* Staff colors */}
                <div className="flex shrink-0 -space-x-1">
                  {assignedStaff.map((member) => {
                    const color = getStaffColor(member.id);

                    return (
                      <span
                        key={member.id}
                        title={`${member.firstName} ${member.lastName}`}
                        className={`h-3 w-3 rounded-full border-2 border-white ${color.dot}`}
                      />
                    );
                  })}

                  {assignedStaff.length === 0 && (
                    <span className="h-3 w-3 rounded-full bg-gray-300" />
                  )}
                </div>

                <h3
                  className={`truncate font-semibold ${primaryColor.text}`}
                >
                  {task.title}
                </h3>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
                {task.area && <span>{task.area}</span>}

                {task.priority !== "normal" && (
                  <span className="font-semibold capitalize">
                    {task.priority}
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm text-gray-700">
                {assignedStaff.length > 0
                  ? assignedStaff
                      .map(
                        (member) =>
                          `${member.firstName} ${member.lastName}`,
                      )
                      .join(", ")
                  : "Unassigned"}
              </p>

              {task.instructions && (
                <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                  {task.instructions}
                </p>
              )}
            </div>

            {/* Status */}
            <span className="shrink-0 rounded-full bg-white/70 px-2.5 py-1 text-xs font-medium capitalize text-gray-600">
              {task.status}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-3 flex justify-end gap-1">
            <button
              type="button"
              onClick={() => onEdit(task)}
              className="cursor-pointer rounded-md px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-white/70"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className="cursor-pointer rounded-md px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
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