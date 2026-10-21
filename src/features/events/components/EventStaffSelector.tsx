import type {
  Staff,
  StaffAvailability,
} from "../../../types/staff";

type EventStaffSelectorProps = {
  staffList: Staff[];
  availabilityList: StaffAvailability[];
  date: string;
  startTime: string;
  endTime: string;
  selectedStaffIds: string[];
  onToggle: (staffId: string) => void;
};

const getAvailabilityLabel = (
  availability: StaffAvailability | undefined,
) => {
  if (!availability) {
    return "Not set";
  }

  if (
    availability.status ===
    "unavailable"
  ) {
    return "Unavailable";
  }

  if (
    availability.availableFrom &&
    availability.availableUntil
  ) {
    return `Available ${availability.availableFrom}–${availability.availableUntil}`;
  }

  return "Available";
};

const isOutsideAvailability = (
  availability: StaffAvailability | undefined,
  startTime: string,
  endTime: string,
) => {
  if (
    !availability ||
    availability.status !== "available" ||
    !availability.availableFrom ||
    !availability.availableUntil ||
    !startTime ||
    !endTime
  ) {
    return false;
  }

  return (
    startTime <
      availability.availableFrom ||
    endTime >
      availability.availableUntil
  );
};

const EventStaffSelector = ({
  staffList,
  availabilityList,
  date,
  startTime,
  endTime,
  selectedStaffIds,
  onToggle,
}: EventStaffSelectorProps) => {
  const eligibleStaff =
    staffList.filter(
      (member) =>
        member.isActive &&
        member.role !== "owner" &&
        member.workTypes.includes("event"),
    );

  if (eligibleStaff.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-(--color-border) bg-(--color-surface-soft) p-4">
        <p className="text-sm text-(--color-text-muted)">
          No active event staff available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {eligibleStaff.map((member) => {
        const availability =
          availabilityList.find(
            (entry) =>
              entry.staffId ===
                member.id &&
              entry.date === date,
          );

        const unavailable =
          availability?.status ===
          "unavailable";

        const outsideAvailability =
          isOutsideAvailability(
            availability,
            startTime,
            endTime,
          );

        const disabled =
          unavailable ||
          outsideAvailability;

        let availabilityLabel =
          getAvailabilityLabel(
            availability,
          );

        if (outsideAvailability) {
          availabilityLabel =
            "Outside availability";
        }

        const selected =
          selectedStaffIds.includes(
            member.id,
          );

        return (
          <label
            key={member.id}
            className={`flex min-w-0 items-start gap-3 rounded-xl border p-3 transition ${
              disabled
                ? "cursor-not-allowed border-(--color-border) bg-(--color-surface-soft) opacity-60"
                : selected
                  ? "cursor-pointer border-(--color-primary-muted) bg-(--color-primary-soft)"
                  : "cursor-pointer border-(--color-border) bg-(--color-surface) hover:bg-(--color-surface-soft)"
            }`}
          >
            <input
              type="checkbox"
              checked={selected}
              disabled={
                disabled &&
                !selected
              }
              onChange={() =>
                onToggle(member.id)
              }
              className="mt-1 size-4 accent-(--color-primary)"
            />

            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-(--color-text)">
                {member.firstName}{" "}
                {member.lastName}
              </span>

              <span
                className={`mt-0.5 block text-xs ${
                  unavailable ||
                  outsideAvailability
                    ? "font-medium text-red-600"
                    : availability
                      ? "text-green-700"
                      : "text-(--color-text-muted)"
                }`}
              >
                {availabilityLabel}
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default EventStaffSelector;