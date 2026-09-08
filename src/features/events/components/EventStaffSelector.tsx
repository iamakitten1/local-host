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
  
    if (availability.status === "unavailable") {
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
      startTime < availability.availableFrom ||
      endTime > availability.availableUntil
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
    const eligibleStaff = staffList.filter(
      (member) =>
        member.isActive &&
        member.role !== "owner" &&
        member.workTypes.includes("event"),
    );
  
    if (eligibleStaff.length === 0) {
      return (
        <p className="text-sm text-gray-500">
          No active event staff available.
        </p>
      );
    }
  
    return (
      <div className="space-y-2">
        {eligibleStaff.map((member) => {
          const availability =
            availabilityList.find(
              (entry) =>
                entry.staffId === member.id &&
                entry.date === date,
            );
  
          const unavailable =
            availability?.status === "unavailable";
  
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
            getAvailabilityLabel(availability);
  
          if (outsideAvailability) {
            availabilityLabel =
              "Outside availability";
          }
  
          return (
            <label
              key={member.id}
              className={`flex min-w-0 items-start gap-3 rounded-lg border p-3 ${
                disabled
                  ? "cursor-not-allowed border-gray-200 bg-gray-50 opacity-60"
                  : "cursor-pointer border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedStaffIds.includes(
                  member.id,
                )}
                disabled={
                    disabled &&
                    !selectedStaffIds.includes(member.id)
                  }
                onChange={() =>
                  onToggle(member.id)
                }
                className="mt-1"
              />
  
              <span className="min-w-0 flex-1">
                <span className="block wrap-break-word text-sm font-medium text-gray-900">
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
                        : "text-gray-500"
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