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
        className="min-h-16 w-full cursor-pointer rounded-lg border border-dashed border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-400 transition hover:border-gray-300 hover:bg-gray-100 lg:px-2 lg:py-2 lg:text-xs"
      >
        Not set
      </button>
    );
  }

  const isAvailable =
    availability.status === "available";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-16 w-full cursor-pointer rounded-lg border px-3 py-2.5 text-left transition lg:px-2 lg:py-2 ${
        isAvailable
          ? "border-green-200 bg-green-50 hover:bg-green-100"
          : "border-red-200 bg-red-50 hover:bg-red-100"
      }`}
    >
      <span
        className={`block text-sm font-semibold lg:text-xs ${
          isAvailable
            ? "text-green-700"
            : "text-red-700"
        }`}
      >
        {isAvailable
          ? "Available"
          : "Unavailable"}
      </span>

      {isAvailable && (
        <span className="mt-1 block text-xs leading-snug text-gray-600">
          {availability.availableFrom ??
            "Any time"}
          {" – "}
          {availability.availableUntil ??
            "Any time"}
        </span>
      )}
    </button>
  );
};

export default AvailabilityCell;