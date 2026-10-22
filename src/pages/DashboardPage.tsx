import {
  BedDouble,
  CalendarCheck2,
  CalendarDays,
  Clock3,
  Sparkles,
  Users,
} from "lucide-react";

import SummaryCard from "../features/dashboard/components/SummaryCard";

import { useWorkTasksContext } from "../features/tasks/context/WorkTasksContext";
import { useEventsContext } from "../features/events/context/EventsContext";
import { useStaffContext } from "../features/staff/context/StaffContext";

import { rooms } from "../data/rooms";
import { bookings } from "../data/bookings";

const getTodayDateKey = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatToday = () =>
  new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

const DashboardPage = () => {
  const { taskList, assignmentList } = useWorkTasksContext();
  const { eventList } = useEventsContext();
  const { staffList } = useStaffContext();

  const today = getTodayDateKey();

  const todaysArrivals = bookings.filter(
    (booking) => booking.checkInDate === today,
  );

  const todaysCleaning = taskList.filter(
    (task) =>
      task.type === "room-cleaning" &&
      task.date === today &&
      task.status !== "cancelled",
  );

  const pendingCleaning = taskList.filter(
    (task) =>
      task.type === "room-cleaning" &&
      task.date <= today &&
      task.status !== "completed" &&
      task.status !== "cancelled",
  );

  const todaysEvents = eventList.filter(
    (event) =>
      event.date === today &&
      event.status !== "cancelled",
  );

  const activeStaff = staffList.filter(
    (member) => member.isActive,
  );

  const todaysSchedule = [
    ...todaysCleaning.map((task) => ({
      id: `task-${task.id}`,
      type: "Cleaning" as const,
      title: task.title,
      time: task.startTime ?? "—",
      area: task.area ?? "Property",
    })),
    ...todaysEvents.map((event) => ({
      id: `event-${event.id}`,
      type: "Event" as const,
      title: event.title,
      time: event.startTime,
      area: event.area ?? "Property",
    })),
  ].sort((a, b) => a.time.localeCompare(b.time));

  const upcomingEvents = eventList
    .filter(
      (event) =>
        event.date >= today &&
        event.status !== "cancelled",
    )
    .sort((a, b) =>
      `${a.date}-${a.startTime}`.localeCompare(
        `${b.date}-${b.startTime}`,
      ),
    )
    .slice(0, 3);

  return (
    <div className="min-w-0 space-y-6">
      {/* Welcome */}
      <section className="overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-primary) text-white shadow-sm">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Property operations
            </p>

            <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              Welcome to LocalHost
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
              Keep today&apos;s rooms, cleaning,
              staff and events organised in one
              place.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/80">
              <CalendarDays
                size={17}
                strokeWidth={1.9}
                aria-hidden="true"
              />

              <span>{formatToday()}</span>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute -right-16 -top-20 size-64 rounded-full bg-white/5"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-24 right-20 size-56 rounded-full bg-white/5"
          />
        </div>
      </section>

      {/* Summary */}
      <section className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Rooms"
          value={rooms.length}
          icon={BedDouble}
        />

        <SummaryCard
          title="Today's Arrivals"
          value={todaysArrivals.length}
          icon={CalendarCheck2}
        />

        <SummaryCard
          title="Cleaning Tasks"
          value={pendingCleaning.length}
          icon={Sparkles}
        />

        <SummaryCard
          title="Active Staff"
          value={activeStaff.length}
          icon={Users}
        />
      </section>

      <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(18rem,0.8fr)]">
        {/* Today's Schedule */}
        <section className="min-w-0 rounded-3xl border border-(--color-border) bg-(--color-surface) p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
                Today
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-tight text-(--color-text)">
                Today&apos;s Schedule
              </h2>
            </div>

            <span className="rounded-full bg-(--color-primary-soft) px-3 py-1 text-xs font-semibold text-(--color-primary)">
              {todaysSchedule.length} items
            </span>
          </div>

          {todaysSchedule.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-(--color-border) bg-(--color-surface-soft) p-8 text-center">
              <p className="text-sm font-medium text-(--color-text)">
                Nothing scheduled today
              </p>

              <p className="mt-1 text-sm text-(--color-text-muted)">
                Cleaning tasks and events will
                appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {todaysSchedule.map((item) => (
                <div
                  key={item.id}
                  className="flex min-w-0 items-start gap-4 rounded-2xl px-3 py-3 transition hover:bg-(--color-surface-soft) sm:px-4"
                >
                  <div className="flex w-14 shrink-0 items-center gap-1.5 pt-0.5 text-sm font-semibold text-(--color-text)">
                    <Clock3
                      size={15}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />

                    {item.time}
                  </div>

                  <div className="mt-1 h-10 w-px shrink-0 bg-(--color-border)" />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-(--color-text)">
                        {item.title}
                      </p>

                      <span className="rounded-full bg-(--color-primary-soft) px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-(--color-primary)">
                        {item.type}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-(--color-text-muted)">
                      {item.area}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Cleaning Tasks */}
        <section className="min-w-0 rounded-3xl border border-(--color-border) bg-(--color-surface) p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
                Operations
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-tight text-(--color-text)">
                Cleaning Tasks
              </h2>
            </div>

            <Sparkles
              size={20}
              strokeWidth={1.8}
              className="text-(--color-primary)"
              aria-hidden="true"
            />
          </div>

          {pendingCleaning.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-(--color-border) bg-(--color-surface-soft) p-6 text-center text-sm text-(--color-text-muted)">
              No pending cleaning tasks.
            </div>
          ) : (
            <div className="space-y-3">
              {pendingCleaning.slice(0, 4).map((task) => {
                const assignment =
                  assignmentList.find(
                    (item) =>
                      item.sourceType ===
                        "work-task" &&
                      item.sourceId === task.id &&
                      item.status !== "declined" &&
                      item.status !== "cancelled",
                  );

                const member = assignment
                  ? staffList.find(
                      (staffMember) =>
                        staffMember.id ===
                        assignment.staffId,
                    )
                  : undefined;

                return (
                  <div
                    key={task.id}
                    className="rounded-2xl border border-(--color-border) bg-(--color-surface-soft) p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-(--color-text)">
                          {task.title}
                        </p>

                        <p className="mt-1 text-xs text-(--color-text-muted)">
                          {member
                            ? `${member.firstName} ${member.lastName}`
                            : "Unassigned"}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold capitalize text-(--color-primary) ring-1 ring-(--color-border)">
                        {task.status.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Upcoming Events */}
      <section className="min-w-0 rounded-3xl border border-(--color-border) bg-(--color-surface) p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)"> 
            Coming up
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight text-(--color-text)">
            Upcoming Events
          </h2>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-(--color-border) bg-(--color-surface-soft) p-6 text-center text-sm text-(--color-text-muted)">
            No upcoming events.
          </div>
        ) : (
          <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-3">
            {upcomingEvents.map((event) => (
              <article
                key={event.id}
                className="rounded-2xl border border-(--color-border) bg-(--color-surface-soft) p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-(--color-primary-soft) text-(--color-primary)">
                    <CalendarDays
                      size={18}
                      strokeWidth={1.9}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-(--color-text)">
                      {event.title}
                    </p>

                    <p className="mt-1 text-sm text-(--color-text-muted)">
                      {event.date}
                    </p>

                    <p className="mt-1 text-xs text-(--color-text-muted)">
                      {event.startTime} – {event.endTime}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Brand strip */}
      <section className="rounded-3xl border border-(--color-border) bg-(--color-surface-soft) px-5 py-4 text-center sm:px-6">
        <p className="text-sm text-(--color-text-muted)">
          Smooth stays start with organised
          operations.
        </p>
      </section>
    </div>
  );
};

export default DashboardPage;