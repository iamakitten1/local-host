import type {
  Staff,
  StaffAvailability,
} from "../../../../types/staff";

import { getStaffColor } from "./staffColors";

type AvailabilityPanelProps = {
  staffList: Staff[];
  availabilityList: StaffAvailability[];
};

const AvailabilityPanel = ({
  staffList,
  availabilityList,
}: AvailabilityPanelProps) => {
  return (
    <section className="min-w-0">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-(--color-text)">
          Availability
        </h3>

        <p className="mt-0.5 text-xs text-(--color-text-muted)">
          Staff availability for scheduled work.
        </p>
      </div>

      <div className="flex min-w-0 flex-wrap gap-2 rounded-2xl border border-(--color-border) bg-(--color-surface) p-3 shadow-sm">
        {availabilityList.map((availability) => {
          const member = staffList.find(
            (staffMember) =>
              staffMember.id === availability.staffId,
          );

          if (!member) {
            return null;
          }

          const isAvailable =
            availability.status === "available";

          const staffColor =
            getStaffColor(member.id);

          return (
            <div
              key={availability.id}
              className="flex w-full min-w-0 items-center gap-3 rounded-xl bg-(--color-surface-soft) px-3 py-2.5 sm:w-auto"
            >
              <span
                className={`size-3 shrink-0 rounded-full ${staffColor.dot}`}
              />

              <div className="min-w-0">
                <p className="text-sm font-medium text-(--color-text)">
                  {member.firstName}
                </p>

                <p
                  className={`text-xs font-medium ${
                    isAvailable
                      ? "text-(--color-text-muted)"
                      : "text-red-600"
                  }`}
                >
                  {isAvailable
                    ? `${availability.availableFrom ?? "Any time"} – ${
                        availability.availableUntil ?? "Any time"
                      }`
                    : "Unavailable"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AvailabilityPanel;