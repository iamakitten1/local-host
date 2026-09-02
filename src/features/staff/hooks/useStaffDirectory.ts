import { useStaffContext } from "../context/StaffContext";

import type { Staff } from "../../../types/staff";

const useStaffDirectory = () => {
  const {
    staffList,
    setStaffList,
  } = useStaffContext();

  const handleSaveStaff = (
    member: Staff,
  ) => {
    setStaffList((currentStaff) => {
      const staffExists =
        currentStaff.some(
          (currentMember) =>
            currentMember.id === member.id,
        );

      if (staffExists) {
        return currentStaff.map(
          (currentMember) =>
            currentMember.id === member.id
              ? member
              : currentMember,
        );
      }

      return [
        ...currentStaff,
        member,
      ];
    });
  };

  return {
    staffList,
    handleSaveStaff,
  };
};

export default useStaffDirectory;