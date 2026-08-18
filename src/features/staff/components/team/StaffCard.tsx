import type { Staff } from "../../../../types/staff";


type StaffCardProps = {
  member: Staff;
  onEdit: (member: Staff) => void;
};

const StaffCard = ({ member, onEdit }: StaffCardProps) => {
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

        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              member.isActive ? "bg-green-500" : "bg-gray-300"
            }`}
            aria-label={member.isActive ? "Active" : "Inactive"}
          />

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-700">
            {member.role}
          </span>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={() => onEdit(member)}
          className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Edit
        </button>
      </div>
    </article>
  );
};

export default StaffCard;