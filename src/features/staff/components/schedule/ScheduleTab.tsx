import {
  CalendarDays,
  Plus,
} from "lucide-react";

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

  onApproveCancellation: (
    assignment: Assignment,
  ) => void;

  onRejectCancellation: (
    assignment: Assignment,
  ) => void;
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
  onApproveCancellation,
  onRejectCancellation,
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

  const itemsByDate =
    scheduleItems.reduce<
      Record<string, ScheduleItem[]>
    >((groups, item) => {
      if (!groups[item.date]) {
        groups[item.date] = [];
      }

      groups[item.date].push(item);

      return groups;
    }, {});

  const sortedDates =
    Object.entries(itemsByDate).sort(
      ([dateA], [dateB]) =>
        dateA.localeCompare(dateB),
    );

  return (
    <div className="min-w-0 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
            Planning
          </p>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-(--color-primary-soft) text-(--color-primary)">
              <CalendarDays
                size={19}
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight text-(--color-text)">
                Schedule
              </h2>

              <p className="mt-1 text-sm text-(--color-text-muted)">
                Staff tasks, events and daily assignments.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddTask}
          className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) sm:w-auto"
        >
          <Plus
            size={17}
            strokeWidth={2}
            aria-hidden="true"
          />

          Add Task
        </button>
      </div>

      <AvailabilityPanel
        staffList={staffList}
        availabilityList={
          availabilityList
        }
      />

      {sortedDates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-(--color-border) bg-(--color-surface) p-8 text-center">
          <p className="text-sm font-semibold text-(--color-text)">
            Nothing scheduled
          </p>

          <p className="mt-1 text-sm text-(--color-text-muted)">
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
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-px flex-1 bg-(--color-border)" />

                  <h3 className="shrink-0 text-sm font-semibold text-(--color-text-muted)">
                    {date}
                  </h3>

                  <div className="h-px flex-1 bg-(--color-border)" />
                </div>

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
                            onApproveCancellation={
                              onApproveCancellation
                            }
                            onRejectCancellation={
                              onRejectCancellation
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
                          staffList={
                            staffList
                          }
                          onEdit={
                            onEditEvent
                          }
                          onDelete={
                            onDeleteEvent
                          }
                          onApproveCancellation={
                            onApproveCancellation
                          }
                          onRejectCancellation={
                            onRejectCancellation
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