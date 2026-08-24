import type { Staff } from "../../../../types/staff";
import type { WorkTaskType } from "../../../../types/workTask";

type TaskAssigneesProps = {
  staffList: Staff[];
  taskType: WorkTaskType;
  selectedStaffIds: string[];
  onChange: (staffIds: string[]) => void;
};

const TaskAssignees = ({
  staffList,
  taskType,
  selectedStaffIds,
  onChange,
}: TaskAssigneesProps) => {
  const handleToggle = (
    staffId: string,
  ) => {
    const isSelected =
      selectedStaffIds.includes(staffId);

    if (isSelected) {
      onChange(
        selectedStaffIds.filter(
          (id) => id !== staffId,
        ),
      );

      return;
    }

    onChange([
      ...selectedStaffIds,
      staffId,
    ]);
  };

  const isCleaningTask =
    taskType === "room-cleaning" ||
    taskType === "property-cleaning" ||
    taskType === "event-cleaning";

  const eligibleStaff =
    staffList.filter((member) => {
      if (!member.isActive) {
        return false;
      }

      if (member.role === "owner") {
        return false;
      }

      if (isCleaningTask) {
        return member.workTypes.includes(
          "cleaning",
        );
      }

      return true;
    });

  return (
    <div className="min-w-0">
      <p className="mb-2 text-sm font-medium text-gray-700">
        Assigned staff
      </p>

      <div className="min-w-0 space-y-2 rounded-lg border border-gray-200 p-3">
        {eligibleStaff.map((member) => {
          const isSelected =
            selectedStaffIds.includes(
              member.id,
            );

          return (
            <label
              key={member.id}
              className="flex min-w-0 cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() =>
                  handleToggle(member.id)
                }
                className="mt-0.5 h-4 w-4 shrink-0"
              />

              <div className="min-w-0 flex-1">
                <p className="wrap-break-word text-sm font-medium text-gray-800">
                  {member.firstName}{" "}
                  {member.lastName}
                </p>

                <p className="mt-0.5 text-xs capitalize text-gray-500">
                  {member.role}
                </p>
              </div>
            </label>
          );
        })}

        {eligibleStaff.length === 0 && (
          <p className="text-sm text-gray-500">
            No eligible staff available.
          </p>
        )}
      </div>

      <p className="mt-1 wrap-break-word text-xs text-gray-500">
        Leave everyone unchecked to keep
        the task unassigned.
      </p>
    </div>
  );
};

export default TaskAssignees;