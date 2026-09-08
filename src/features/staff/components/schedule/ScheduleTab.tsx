import type { WorkTask } from "../../../../types/workTask";
import type { Assignment } from "../../../../types/assignment";
import type { Event as LocalHostEvent } from "../../../../types/event";

import type {
  Staff,
  StaffAvailability,
} from "../../../../types/staff";

import ScheduleTaskCard from "./ScheduleTaskCard";
import ScheduleEventCard from "./ScheduleEventCard";
import AvailabilityPanel from "./AvailabilityPanel";

type ScheduleTabProps = {
  taskList: WorkTask[];
  assignmentList: Assignment[];

  eventList: LocalHostEvent[];
  eventAssignmentList: Assignment[];

  staffList: Staff[];
  availabilityList: StaffAvailability[];

  onAddTask: () => void;

  onEditTask: (task: WorkTask) => void;
  onDeleteTask: (taskId: string) => void;

  onEditEvent: (event: LocalHostEvent) => void;
  onDeleteEvent: (eventId: string) => void;
};

type ScheduleItem =
  | {
      kind: "task";
      date: string;
      startTime: string;
      task: WorkTask;
    }
  | {
      kind: "event";
      date: string;
      startTime: string;
      event: LocalHostEvent;
    };

const ScheduleTab = ({
  taskList,
  assignmentList,
  eventList,
  eventAssignmentList,
  staffList,
  availabilityList,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onEditEvent,
  onDeleteEvent,
}: ScheduleTabProps) => {
  const scheduleItems: ScheduleItem[] = [
    ...taskList.map((task) => ({
      kind: "task" as const,
      date: task.date,
      startTime: task.startTime ?? "",
      task,
    })),

    ...eventList.map((event) => ({
      kind: "event" as const,
      date: event.date,
      startTime: event.startTime,
      event,
    })),
  ];

  const itemsByDate = scheduleItems.reduce<
    Record<string, ScheduleItem[]>
  >((groups, item) => {
    if (!groups[item.date]) {
      groups[item.date] = [];
    }

    groups[item.date].push(item);

    return groups;
  }, {});

  const sortedDates = Object.entries(
    itemsByDate,
  ).sort(([dateA], [dateB]) =>
    dateA.localeCompare(dateB),
  );

  return (
    <div className="min-w-0">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-gray-900">
            Schedule
          </h2>

          <p className="mt-1 wrap-break-word text-sm text-gray-500">
            Staff tasks, events, and daily assignments
          </p>
        </div>

        <button
          type="button"
          onClick={onAddTask}
          className="w-full shrink-0 cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto"
        >
          + Add Task
        </button>
      </div>

      <AvailabilityPanel
        staffList={staffList}
        availabilityList={availabilityList}
      />

      {sortedDates.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <p className="text-sm font-medium text-gray-700">
            Nothing scheduled
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Tasks and events will appear here.
          </p>
        </div>
      ) : (
        <div className="min-w-0 space-y-8">
          {sortedDates.map(
            ([date, items]) => (
              <section
                key={date}
                className="min-w-0"
              >
                <h3 className="mb-3 text-sm font-semibold text-gray-700">
                  {date}
                </h3>

                <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
                  {[...items]
                    .sort((a, b) =>
                      a.startTime.localeCompare(
                        b.startTime,
                      ),
                    )
                    .map((item) => {
                      if (
                        item.kind === "task"
                      ) {
                        const taskAssignments =
                          assignmentList.filter(
                            (assignment) =>
                              assignment.sourceType ===
                                "work-task" &&
                              assignment.sourceId ===
                                item.task.id,
                          );

                        return (
                          <ScheduleTaskCard
                            key={`task-${item.task.id}`}
                            task={item.task}
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
                      }

                      const eventAssignments =
                        eventAssignmentList.filter(
                          (assignment) =>
                            assignment.sourceType ===
                              "event" &&
                            assignment.sourceId ===
                              item.event.id,
                        );

                      return (
                        <ScheduleEventCard
                          key={`event-${item.event.id}`}
                          event={item.event}
                          assignments={
                            eventAssignments
                          }
                          staffList={staffList}
                          onEdit={
                            onEditEvent
                          }
                          onDelete={
                            onDeleteEvent
                          }
                        />
                      );
                    })}
                </div>
              </section>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleTab;