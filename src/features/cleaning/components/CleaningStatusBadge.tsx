import type { CleaningStatus } from "../../../types/cleaning";

type CleaningStatusBadgeProps = {
  status: CleaningStatus;
};

const CleaningStatusBadge = ({
  status,
}: CleaningStatusBadgeProps) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };

  const statusLabels = {
    pending: "Pending",
    "in-progress": "In progress",
    completed: "Completed",
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