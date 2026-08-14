import type { Staff } from "../../../types/staff";

type StaffCardProps = {
  member: Staff;
};

const StaffCard = ({ member }: StaffCardProps) => {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-gray-900">
            {member.firstName} {member.lastName}
          </h2>

          <p className="mt-1 break-all text-sm text-gray-500">
            {member.email}
          </p>

          {member.phone && (
            <p className="mt-1 text-sm text-gray-500">
              {member.phone}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-700">
            {member.role}
          </span>

          <span
            className={`text-xs font-medium ${
              member.isActive
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            {member.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </article>
  );
};

export default StaffCard;