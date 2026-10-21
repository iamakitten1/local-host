import { Plus } from "lucide-react";

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
  const activeCount = staffList.filter(
    (member) => member.isActive,
  ).length;

  return (
    <div className="min-w-0 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-(--color-text)">
            Team members: {staffList.length}
          </p>

          <p className="mt-1 text-xs text-(--color-text-muted)">
            Active: {activeCount}
          </p>
        </div>

        <button
          type="button"
          onClick={onAddStaff}
          className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) sm:w-auto"
        >
          <Plus
            size={17}
            strokeWidth={2}
            aria-hidden="true"
          />

          Add Staff
        </button>
      </div>

      {staffList.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-(--color-border) bg-(--color-surface) p-8 text-center">
          <p className="text-sm font-semibold text-(--color-text)">
            No staff members yet
          </p>

          <p className="mt-1 text-sm text-(--color-text-muted)">
            Add your first team member to get started.
          </p>
        </div>
      ) : (
        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {staffList.map((member) => (
            <StaffCard
              key={member.id}
              member={member}
              onEdit={onEditStaff}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamTab;