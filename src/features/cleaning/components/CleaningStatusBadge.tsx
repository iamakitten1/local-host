import type { WorkTaskStatus } from "../../../types/workTask";

type CleaningStatusBadgeProps = {
  status: WorkTaskStatus;
};

const CleaningStatusBadge = ({
  status,
}: CleaningStatusBadgeProps) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-gray-200 text-gray-600",
  };

  const statusLabels = {
    pending: "Pending",
    "in-progress": "In progress",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
};

export default CleaningStatusBadge;