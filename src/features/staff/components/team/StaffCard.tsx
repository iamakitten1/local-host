import {
  Mail,
  Pencil,
  Phone,
  UserRound,
} from "lucide-react";

import type { Staff } from "../../../../types/staff";

type StaffCardProps = {
  member: Staff;
  onEdit: (member: Staff) => void;
};

const StaffCard = ({
  member,
  onEdit,
}: StaffCardProps) => {
  return (
    <article className="min-w-0 rounded-3xl border border-(--color-border) bg-(--color-surface) p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-(--color-primary-soft) text-(--color-primary)">
          <UserRound
            size={20}
            strokeWidth={1.9}
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold tracking-tight text-(--color-text)">
            {member.firstName} {member.lastName}
          </h2>

          <div className="mt-2 space-y-1.5 text-sm text-(--color-text-muted)">
            <p className="flex min-w-0 items-center gap-2">
              <Mail
                size={14}
                strokeWidth={1.8}
                className="shrink-0"
                aria-hidden="true"
              />

              <span className="truncate">
                {member.email}
              </span>
            </p>

            {member.phone && (
              <p className="flex items-center gap-2">
                <Phone
                  size={14}
                  strokeWidth={1.8}
                  className="shrink-0"
                  aria-hidden="true"
                />

                {member.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
            member.isActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <span
            className={`size-2 rounded-full ${
              member.isActive
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          />

          {member.isActive
            ? "Active"
            : "Inactive"}
        </span>

        <span className="rounded-full bg-(--color-primary-soft) px-2.5 py-1 text-xs font-semibold capitalize text-(--color-primary)">
          {member.role}
        </span>

        {member.workTypes.map(
          (workType) => (
            <span
              key={workType}
              className="rounded-full bg-(--color-surface-soft) px-2.5 py-1 text-xs font-medium capitalize text-(--color-text-muted) ring-1 ring-(--color-border)"
            >
              {workType}
            </span>
          ),
        )}
      </div>

      <div className="mt-5 border-t border-(--color-border) pt-4">
        <button
          type="button"
          onClick={() => onEdit(member)}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-(--color-text) transition hover:bg-(--color-surface-soft)"
        >
          <Pencil
            size={15}
            strokeWidth={1.9}
            aria-hidden="true"
          />

          Edit
        </button>
      </div>
    </article>
  );
};

export default StaffCard;