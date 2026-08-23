import type { WorkTask } from "../../../../types/workTask";
import type { Assignment } from "../../../../types/assignment";

import type {
  Staff,
  StaffAvailability,
} from "../../../../types/staff";

import ScheduleTaskCard from "./ScheduleTaskCard";
import AvailabilityPanel from "./AvailabilityPanel";

type ScheduleTabProps = {
  taskList: WorkTask[];
  assignmentList: Assignment[];
  staffList: Staff[];
  availabilityList: StaffAvailability[];

  onAddTask: () => void;
  onEditTask: (task: WorkTask) => void;
  onDeleteTask: (taskId: string) => void;
};

const ScheduleTab = ({
  taskList,
  assignmentList,
  staffList,
  availabilityList,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: ScheduleTabProps) => {
  const tasksByDate = taskList.reduce<
    Record<string, WorkTask[]>
  >((groups, task) => {
    if (!groups[task.date]) {
      groups[task.date] = [];
    }

    groups[task.date].push(task);

    return groups;
  }, {});

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Schedule
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Staff tasks and daily assignments
          </p>
        </div>

        <button
          type="button"
          onClick={onAddTask}
          className="w-full cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto"
        >
          + Add Task
        </button>
      </div>

      <AvailabilityPanel
        staffList={staffList}
        availabilityList={availabilityList}
      />

      <div className="space-y-8">
        {Object.entries(tasksByDate).map(
          ([date, tasks]) => (
            <section key={date}>
              <h3 className="mb-3 text-sm font-semibold text-gray-700">
                {date}
              </h3>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {[...tasks]
                  .sort((a, b) =>
                    (
                      a.startTime ?? ""
                    ).localeCompare(
                      b.startTime ?? "",
                    ),
                  )
                  .map((task) => {
                    const taskAssignments =
                      assignmentList.filter(
                        (assignment) =>
                          assignment.sourceType ===
                            "work-task" &&
                          assignment.sourceId ===
                            task.id,
                      );

                    return (
                      <ScheduleTaskCard
                        key={task.id}
                        task={task}
                        assignments={
                          taskAssignments
                        }
                        staffList={
                          staffList
                        }
                        onEdit={
                          onEditTask
                        }
                        onDelete={
                          onDeleteTask
                        }
                      />
                    );
                  })}
              </div>
            </section>
          ),
        )}
      </div>
    </div>
  );
};

export default ScheduleTab;