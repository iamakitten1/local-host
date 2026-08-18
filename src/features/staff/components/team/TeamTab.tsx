import type { Staff } from "../../../../types/staff";
import StaffCard from "./StaffCard";

type TeamTabProps = {
  staffList: Staff[];
  onAddStaff: () => void;
  onEditStaff: (member: Staff) => void;
};

const TeamTab = ({
  staffList,
  onAddStaff,
  onEditStaff,
}: TeamTabProps) => {
  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          Team members: {staffList.length}
        </p>

        <button
          type="button"
          onClick={onAddStaff}
          className="w-full cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto"
        >
          + Add Staff
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {staffList.map((member) => (
          <StaffCard
            key={member.id}
            member={member}
            onEdit={onEditStaff}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamTab;