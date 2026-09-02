import { useStaffContext } from "../context/StaffContext";

import type { StaffAvailability } from "../../../types/staff";

const useStaffAvailability = () => {
  const {
    availabilityList,
    setAvailabilityList,
  } = useStaffContext();

  const handleSaveAvailability = (
    availability: StaffAvailability,
  ) => {
    setAvailabilityList(
      (currentAvailability) => {
        const availabilityExists =
          currentAvailability.some(
            (currentEntry) =>
              currentEntry.id ===
              availability.id,
          );

        if (availabilityExists) {
          return currentAvailability.map(
            (currentEntry) =>
              currentEntry.id ===
              availability.id
                ? availability
                : currentEntry,
          );
        }

        return [
          ...currentAvailability,
          availability,
        ];
      },
    );
  };

  return {
    availabilityList,
    handleSaveAvailability,
  };
};

export default useStaffAvailability;