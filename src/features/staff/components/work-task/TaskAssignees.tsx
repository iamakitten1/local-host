import type { Staff } from "../../../../types/staff";

type TaskAssigneesProps = {
  staffList: Staff[];
  assignedStaffIds: string[];
  onChange: (staffIds: string[]) => void;
};

const TaskAssignees = ({
  staffList,
  assignedStaffIds,
  onChange,
}: TaskAssigneesProps) => {
  const handleToggle = (staffId: string) => {
    const isAssigned = assignedStaffIds.includes(staffId);

    if (isAssigned) {
      onChange(
        assignedStaffIds.filter((id) => id !== staffId),
      );
      return;
    }

    onChange([...assignedStaffIds, staffId]);
  };

  const activeStaff = staffList.filter((member) => member.isActive);

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-gray-700">
        Assigned staff
      </p>

      <div className="space-y-2 rounded-lg border border-gray-200 p-3">
        {activeStaff.map((member) => {
          const isAssigned = assignedStaffIds.includes(member.id);

          return (
            <label
              key={member.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={isAssigned}
                onChange={() => handleToggle(member.id)}
                className="h-4 w-4"
              />

              <span className="text-sm text-gray-800">
                {member.firstName} {member.lastName}
              </span>

              <span className="ml-auto text-xs capitalize text-gray-500">
                {member.role}
              </span>
            </label>
          );
        })}

        {activeStaff.length === 0 && (
          <p className="text-sm text-gray-500">
            No active staff available.
          </p>
        )}
      </div>

      <p className="mt-1 text-xs text-gray-500">
        Leave everyone unchecked to keep the task unassigned.
      </p>
    </div>
  );
};

export default TaskAssignees;