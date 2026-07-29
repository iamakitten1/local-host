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
          // Cleaning task-ის შესაბამის ოთახს ვპოულობთ
          const room = rooms.find((room) => room.id === task.roomId);

          // Cleaning task-ის შესაბამის booking-ს ვპოულობთ
          const booking = bookings.find(
            (booking) => booking.id === task.bookingId,
          );

          // ვპოულობთ ვის აქვს cleaning task მინიჭებული
          const assignedStaff = staff.find(
            (person) => person.id === task.assignedStaffId,
          );

          return (
            <div
              key={task.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              {/* Room */}
              <p className="font-semibold text-gray-900">
                {room?.name ?? "Unknown room"}
              </p>

              {/* Guest count */}
              <p className="mt-1 text-sm text-gray-500">
                Prepare for: {booking?.guestCount ?? "Unknown"}{" "}
                {booking?.guestCount === 1 ? "guest" : "guests"}
              </p>

              {/* Selected beds */}
              <p className="mt-1 text-sm text-gray-500">
                Bed setup:{" "}
                {booking && booking.selectedBeds.length > 0
                  ? booking.selectedBeds
                      .map((bed) => `${bed.quantity} ${bed.type}`)
                      .join(" + ")
                  : "Not selected"}
              </p>

              {/* Staff */}
              <p className="mt-1 text-sm text-gray-500">
                Staff:{" "}
                {assignedStaff
                  ? `${assignedStaff.firstName} ${assignedStaff.lastName}`
                  : "Unassigned"}
              </p>

              {/* Status */}
              <span
                className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  task.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : task.status === "in-progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {task.status === "pending"
                  ? "Pending"
                  : task.status === "in-progress"
                    ? "In Progress"
                    : "Completed"}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CleaningOverview;
