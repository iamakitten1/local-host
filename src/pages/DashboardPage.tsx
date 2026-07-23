import SummaryCard from "../features/dashboard/components/SummaryCard";
import { rooms } from "../data/rooms";
import { bookings } from "../data/bookings";
import { cleaningTasks } from "../data/cleaningTasks";
import ArrivalsList from "../features/dashboard/components/ArrivalsList";
import CleaningOverview from "../features/dashboard/components/CleaningOverview";
import DeparturesList from "../features/dashboard/components/DeparturesList";


const DashboardPage = () => {
  const today = "2026-07-22";

  const todaysArrivals = bookings.filter(
    (booking) => booking.checkInDate === today,
  );

  const todaysDepartures = bookings.filter(
    (booking) => booking.checkOutDate === today,
  );
  const pendingCleaning = cleaningTasks.filter(
    (task) => task.status === "pending",
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">Today's overview</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Rooms" value={rooms.length} />
        <SummaryCard title="Today's Arrivals" value={todaysArrivals.length} />
        <SummaryCard
          title="Today's Departures"
          value={todaysDepartures.length}
        />
        <SummaryCard title="Pending Cleaning" value={pendingCleaning.length} />
      </div>

      <ArrivalsList bookings={todaysArrivals} />
      <DeparturesList bookings={todaysDepartures} />
      <CleaningOverview tasks={pendingCleaning} />
    </div>
  );
};

export default DashboardPage;
