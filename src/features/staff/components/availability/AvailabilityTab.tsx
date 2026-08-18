import { useState } from "react";

import type {
  Staff,
  StaffAvailability,
} from "../../../../types/staff";

import AvailabilityCell from "./AvailabilityCell";
import AvailabilityFormModal from "./AvailabilityFormModal";
import { getStaffColor } from "../schedule/staffColors";

type AvailabilityTabProps = {
  staffList: Staff[];
  availabilityList: StaffAvailability[];
  onSaveAvailability: (
    availability: StaffAvailability,
  ) => void;
};

const DAY_NAMES = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

const formatDateKey = (date: Date) =>
  date.toISOString().split("T")[0];

const addDays = (date: Date, amount: number) => {
  const nextDate = new Date(date);

  nextDate.setDate(
    nextDate.getDate() + amount,
  );

  return nextDate;
};

const getStartOfWeek = (date: Date) => {
  const start = new Date(date);

  const day = start.getDay();

  const difference =
    day === 0
      ? -6
      : 1 - day;

  start.setDate(
    start.getDate() + difference,
  );

  return start;
};

const formatShortDate = (date: Date) =>
  date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

const AvailabilityTab = ({
  staffList,
  availabilityList,
  onSaveAvailability,
}: AvailabilityTabProps) => {
  const [weekStart, setWeekStart] =
    useState(() =>
      getStartOfWeek(
        new Date("2026-08-18"),
      ),
    );

  const [selectedMember, setSelectedMember] =
    useState<Staff | null>(null);

  const [selectedDate, setSelectedDate] =
    useState<string | null>(null);

  const [
    selectedAvailability,
    setSelectedAvailability,
  ] = useState<
    StaffAvailability | undefined
  >(undefined);

  const weekDays = Array.from(
    { length: 7 },
    (_, index) =>
      addDays(weekStart, index),
  );

  const weekEnd = weekDays[6];

  const goToPreviousWeek = () => {
    setWeekStart((currentWeek) =>
      addDays(currentWeek, -7),
    );
  };

  const goToNextWeek = () => {
    setWeekStart((currentWeek) =>
      addDays(currentWeek, 7),
    );
  };

  const closeAvailabilityModal = () => {
    setSelectedMember(null);
    setSelectedDate(null);
    setSelectedAvailability(undefined);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Availability
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Plan staff availability in advance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToPreviousWeek}
            className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            ←
          </button>

          <div className="min-w-36 text-center text-sm font-semibold text-gray-800">
            {formatShortDate(weekStart)}
            {" – "}
            {formatShortDate(weekEnd)}
          </div>

          <button
            type="button"
            onClick={goToNextWeek}
            className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            →
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-[210px_repeat(7,minmax(100px,1fr))] border-b border-gray-200 bg-gray-50">
            <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Staff
            </div>

            {weekDays.map(
              (date, index) => (
                <div
                  key={formatDateKey(date)}
                  className="border-l border-gray-200 px-3 py-3 text-center"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {DAY_NAMES[index]}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {formatShortDate(date)}
                  </p>
                </div>
              ),
            )}
          </div>

          {staffList
            .filter(
              (member) =>
                member.isActive,
            )
            .map((member) => {
              const color =
                getStaffColor(member.id);

              return (
                <div
                  key={member.id}
                  className="grid grid-cols-[210px_repeat(7,minmax(100px,1fr))] border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-3 px-4 py-3">
                    <span
                      className={`h-3 w-3 shrink-0 rounded-full ${color.dot}`}
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {member.firstName}{" "}
                        {member.lastName}
                      </p>

                      <p className="text-xs capitalize text-gray-500">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {weekDays.map(
                    (date) => {
                      const dateKey =
                        formatDateKey(date);

                      const availability =
                        availabilityList.find(
                          (entry) =>
                            entry.staffId ===
                              member.id &&
                            entry.date ===
                              dateKey,
                        );

                      return (
                        <div
                          key={dateKey}
                          className="border-l border-gray-100 p-2"
                        >
                          <AvailabilityCell
                            availability={
                              availability
                            }
                            onClick={() => {
                              setSelectedMember(
                                member,
                              );

                              setSelectedDate(
                                dateKey,
                              );

                              setSelectedAvailability(
                                availability,
                              );
                            }}
                          />
                        </div>
                      );
                    },
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {selectedMember &&
        selectedDate && (
          <AvailabilityFormModal
            member={selectedMember}
            date={selectedDate}
            availability={
              selectedAvailability
            }
            onClose={
              closeAvailabilityModal
            }
            onSave={
              onSaveAvailability
            }
          />
        )}
    </div>
  );
};

export default AvailabilityTab;