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
    <section className="mb-6 min-w-0">
      <div className="mb-3 min-w-0">
        <h3 className="text-base font-semibold text-gray-900">
          Availability
        </h3>

        <p className="mt-0.5 wrap-break-word text-xs text-gray-500">
          Staff availability for scheduled work
        </p>
      </div>

      <div className="flex min-w-0 flex-wrap gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
        {availabilityList.map(
          (availability) => {
            const member =
              staffList.find(
                (staffMember) =>
                  staffMember.id ===
                  availability.staffId,
              );

            if (!member) {
              return null;
            }

            const isAvailable =
              availability.status ===
              "available";

            const staffColor =
              getStaffColor(member.id);

            return (
              <div
                key={availability.id}
                className="flex w-full min-w-0 items-center gap-3 rounded-lg bg-gray-50 px-3 py-2 sm:w-auto"
              >
                <span
                  className={`h-3 w-3 shrink-0 rounded-full ${staffColor.dot}`}
                />

                <div className="min-w-0">
                  <p className="wrap-break-word text-sm font-medium text-gray-900">
                    {member.firstName}
                  </p>

                  <p
                    className={`wrap-break-word text-xs font-medium ${
                      isAvailable
                        ? "text-gray-600"
                        : "text-red-600"
                    }`}
                  >
                    {isAvailable
                      ? `${availability.availableFrom ?? "Any time"} – ${
                          availability.availableUntil ??
                          "Any time"
                        }`
                      : "Unavailable"}
                  </p>
                </div>
              </div>
            );
          },
        )}
      </div>
    </section>
  );
};

export default AvailabilityPanel;