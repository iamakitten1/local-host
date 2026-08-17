import type { WorkTask } from "../../../types/workTask";
import { rooms } from "../../../data/rooms";
import { bookings } from "../../../data/bookings";
import { staff } from "../../../data/staff";

type CleaningOverviewProps = {
  tasks: WorkTask[];
};

const CleaningOverview = ({ tasks }: CleaningOverviewProps) => {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Cleaning
      </h2>

      <div className="space-y-3">
        {tasks.map((task) => {
          const room = rooms.find(
            (room) => room.id === task.roomId,
          );

          const booking = bookings.find(
            (booking) => booking.id === task.bookingId,
          );

          const assignedStaff = staff.filter((person) =>
            task.assignedStaffIds.includes(person.id),
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
                Prepare for: {booking?.guestCount ?? "Unknown"}{" "}
                {booking?.guestCount === 1
                  ? "guest"
                  : "guests"}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Bed setup:{" "}
                {booking && booking.selectedBeds.length > 0
                  ? booking.selectedBeds
                      .map(
                        (bed) =>
                          `${bed.quantity} ${bed.type}`,
                      )
                      .join(" + ")
                  : "Not selected"}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Staff:{" "}
                {assignedStaff.length > 0
                  ? assignedStaff
                      .map(
                        (person) =>
                          `${person.firstName} ${person.lastName}`,
                      )
                      .join(", ")
                  : "Unassigned"}
              </p>

              <span
                className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  task.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : task.status === "in-progress"
                      ? "bg-blue-100 text-blue-700"
                      : task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                }`}
              >
                {task.status === "pending"
                  ? "Pending"
                  : task.status === "in-progress"
                    ? "In Progress"
                    : task.status === "completed"
                      ? "Completed"
                      : "Cancelled"}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CleaningOverview;