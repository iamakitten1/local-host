import SummaryCard from "../features/dashboard/components/SummaryCard";
import ArrivalsList from "../features/dashboard/components/ArrivalsList";
import CleaningOverview from "../features/dashboard/components/CleaningOverview";
import DeparturesList from "../features/dashboard/components/DeparturesList";

import { useWorkTasksContext } from "../features/tasks/context/WorkTasksContext";

import { rooms } from "../data/rooms";
import { bookings } from "../data/bookings";

const getTodayDateKey = () => {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(
    today.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const DashboardPage = () => {
  const {
    taskList,
    assignmentList,
  } = useWorkTasksContext();

  const today = getTodayDateKey();

  const todaysArrivals = bookings.filter(
    (booking) =>
      booking.checkInDate === today,
  );

  const todaysDepartures = bookings.filter(
    (booking) =>
      booking.checkOutDate === today,
  );

  const pendingCleaning = taskList.filter(
    (task) =>
      task.type === "room-cleaning" &&
      task.date <= today &&
      task.status !== "completed" &&
      task.status !== "cancelled",
  );

  return (
    <div className="min-w-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Today's overview
        </p>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Rooms"
          value={rooms.length}
        />

        <SummaryCard
          title="Today's Arrivals"
          value={todaysArrivals.length}
        />

        <SummaryCard
          title="Today's Departures"
          value={todaysDepartures.length}
        />

        <SummaryCard
          title="Pending Cleaning"
          value={pendingCleaning.length}
        />
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        <ArrivalsList
          bookings={todaysArrivals}
        />

        <DeparturesList
          bookings={todaysDepartures}
        />
      </div>

      <CleaningOverview
        tasks={pendingCleaning}
        assignments={assignmentList}
      />
    </div>
  );
};

export default DashboardPage;