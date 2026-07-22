import type { CleaningTask } from "../../../types/cleaning";
import { rooms } from "../../../data/rooms";
import { bookings } from "../../../data/bookings";
import { staff } from "../../../data/staff";

type CleaningOverviewProps = {
  tasks: CleaningTask[];
};

const CleaningOverview = ({ tasks }: CleaningOverviewProps) => {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Cleaning</h2>

      <div className="space-y-3">
        {tasks.map((task) => {
          const room = rooms.find((room) => room.id === task.roomId);

          const booking = bookings.find(
            (booking) => booking.id === task.bookingId,
          );

          const bedConfiguration = room?.bedConfigurations.find(
            (config) => config.id === booking?.bedConfigurationId,
          );

          const assignedStaff = staff.find(
            (person) => person.id === task.assignedStaffId,
          );

          return (
            <div
              key={task.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <p className="font-semibold text-gray-900">
                {room?.name ?? "Unknown room"}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Prepare for: {booking?.guestCount ?? "Unknown"} guests
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Bed setup:{" "}
                {bedConfiguration
                  ? bedConfiguration.beds
                      .map((bed) => `${bed.quantity} ${bed.type}`)
                      .join(" + ")
                  : "Not selected"}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Staff:{" "}
                {assignedStaff
                  ? `${assignedStaff.firstName} ${assignedStaff.lastName}`
                  : "Unassigned"}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Status: {task.status}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CleaningOverview;
