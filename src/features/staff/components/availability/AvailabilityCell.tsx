import type { StaffAvailability } from "../../../../types/staff";

type AvailabilityCellProps = {
  availability?: StaffAvailability;
  onClick: () => void;
};

const AvailabilityCell = ({
  availability,
  onClick,
}: AvailabilityCellProps) => {
  if (!availability) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="min-h-16 w-full cursor-pointer rounded-lg border border-dashed border-gray-200 bg-gray-50 px-2 py-2 text-xs text-gray-400 transition hover:border-gray-300 hover:bg-gray-100"
      >
        —
      </button>
    );
  }

  const isAvailable =
    availability.status === "available";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-16 w-full cursor-pointer rounded-lg border px-2 py-2 text-left transition ${
        isAvailable
          ? "border-green-200 bg-green-50 hover:bg-green-100"
          : "border-red-200 bg-red-50 hover:bg-red-100"
      }`}
    >
      <span
        className={`block text-xs font-semibold ${
          isAvailable
            ? "text-green-700"
            : "text-red-700"
        }`}
      >
        {isAvailable ? "Available" : "Unavailable"}
      </span>

      {isAvailable && (
        <span className="mt-1 block text-xs text-gray-600">
          {availability.availableFrom ?? "Any time"}
          {" – "}
          {availability.availableUntil ?? "Any time"}
        </span>
      )}
    </button>
  );
};

export default AvailabilityCell;