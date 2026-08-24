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

const formatDateKey = (
  date: Date,
) => {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(
    date.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const addDays = (
  date: Date,
  amount: number,
) => {
  const nextDate = new Date(date);

  nextDate.setDate(
    nextDate.getDate() + amount,
  );

  return nextDate;
};

const getStartOfWeek = (
  date: Date,
) => {
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

const getCurrentWeekDayIndex = () => {
  const day = new Date().getDay();

  return day === 0
    ? 6
    : day - 1;
};

const formatShortDate = (
  date: Date,
) =>
  date.toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
    },
  );

const formatLongDate = (
  date: Date,
) =>
  date.toLocaleDateString(
    "en-GB",
    {
      weekday: "long",
      day: "numeric",
      month: "short",
    },
  );

const AvailabilityTab = ({
  staffList,
  availabilityList,
  onSaveAvailability,
}: AvailabilityTabProps) => {
  const [weekStart, setWeekStart] =
    useState(() =>
      getStartOfWeek(new Date()),
    );

  const [
    selectedDayIndex,
    setSelectedDayIndex,
  ] = useState(() =>
    getCurrentWeekDayIndex(),
  );

  const [
    selectedMember,
    setSelectedMember,
  ] = useState<Staff | null>(null);

  const [
    selectedDate,
    setSelectedDate,
  ] = useState<string | null>(null);

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

  const selectedMobileDate =
    weekDays[selectedDayIndex];

  const activeStaff =
    staffList.filter(
      (member) => member.isActive,
    );

  const goToPreviousWeek = () => {
    setWeekStart(
      (currentWeek) =>
        addDays(currentWeek, -7),
    );

    setSelectedDayIndex(0);
  };

  const goToNextWeek = () => {
    setWeekStart(
      (currentWeek) =>
        addDays(currentWeek, 7),
    );

    setSelectedDayIndex(0);
  };

  const openAvailabilityModal = (
    member: Staff,
    dateKey: string,
    availability?: StaffAvailability,
  ) => {
    setSelectedMember(member);
    setSelectedDate(dateKey);
    setSelectedAvailability(
      availability,
    );
  };

  const closeAvailabilityModal = () => {
    setSelectedMember(null);
    setSelectedDate(null);
    setSelectedAvailability(
      undefined,
    );
  };

  return (
    <div className="min-w-0">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-gray-900">
            Availability
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Plan staff availability in
            advance.
          </p>
        </div>

        {/* Week navigation */}
        <div className="flex w-full items-center justify-between gap-2 sm:w-auto">
          <button
            type="button"
            aria-label="Previous week"
            onClick={
              goToPreviousWeek
            }
            className="shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            ←
          </button>

          <div className="min-w-0 flex-1 text-center text-sm font-semibold text-gray-800 sm:min-w-36">
            {formatShortDate(
              weekStart,
            )}
            {" – "}
            {formatShortDate(weekEnd)}
          </div>

          <button
            type="button"
            aria-label="Next week"
            onClick={goToNextWeek}
            className="shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            →
          </button>
        </div>
      </div>

      {/* Mobile / tablet */}
      <div className="min-w-0 lg:hidden">
        {/* Day selector */}
        <div className="grid grid-cols-7 gap-1 rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
          {weekDays.map(
            (date, index) => {
              const isSelected =
                selectedDayIndex ===
                index;

              return (
                <button
                  key={formatDateKey(
                    date,
                  )}
                  type="button"
                  onClick={() =>
                    setSelectedDayIndex(
                      index,
                    )
                  }
                  className={`min-w-0 cursor-pointer rounded-lg px-1 py-2 text-center ${
                    isSelected
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="block text-[11px] font-medium">
                    {
                      DAY_NAMES[
                        index
                      ]
                    }
                  </span>

                  <span className="mt-0.5 block text-sm font-semibold">
                    {date.getDate()}
                  </span>
                </button>
              );
            },
          )}
        </div>

        {/* Selected day */}
        <section className="mt-4 min-w-0">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            {formatLongDate(
              selectedMobileDate,
            )}
          </h3>

          <div className="space-y-3">
            {activeStaff.map(
              (member) => {
                const dateKey =
                  formatDateKey(
                    selectedMobileDate,
                  );

                const availability =
                  availabilityList.find(
                    (entry) =>
                      entry.staffId ===
                        member.id &&
                      entry.date ===
                        dateKey,
                  );

                const color =
                  getStaffColor(
                    member.id,
                  );

                return (
                  <div
                    key={member.id}
                    className="min-w-0 rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
                  >
                    <div className="mb-3 flex min-w-0 items-center gap-3">
                      <span
                        className={`h-3 w-3 shrink-0 rounded-full ${color.dot}`}
                      />

                      <div className="min-w-0">
                        <p className="wrap-break-word text-sm font-semibold text-gray-900">
                          {
                            member.firstName
                          }{" "}
                          {
                            member.lastName
                          }
                        </p>

                        <p className="text-xs capitalize text-gray-500">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    <AvailabilityCell
                      availability={
                        availability
                      }
                      onClick={() =>
                        openAvailabilityModal(
                          member,
                          dateKey,
                          availability,
                        )
                      }
                    />
                  </div>
                );
              },
            )}
          </div>
        </section>
      </div>

      {/* Desktop weekly calendar */}
      <div className="hidden overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm lg:block">
        <div className="min-w-[900px]">
          {/* Week header */}
          <div className="grid grid-cols-[210px_repeat(7,minmax(100px,1fr))] border-b border-gray-200 bg-gray-50">
            <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Staff
            </div>

            {weekDays.map(
              (date, index) => (
                <div
                  key={formatDateKey(
                    date,
                  )}
                  className="border-l border-gray-200 px-3 py-3 text-center"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {
                      DAY_NAMES[
                        index
                      ]
                    }
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {formatShortDate(
                      date,
                    )}
                  </p>
                </div>
              ),
            )}
          </div>

          {/* Staff rows */}
          {activeStaff.map(
            (member) => {
              const color =
                getStaffColor(
                  member.id,
                );

              return (
                <div
                  key={member.id}
                  className="grid grid-cols-[210px_repeat(7,minmax(100px,1fr))] border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex min-w-0 items-center gap-3 px-4 py-3">
                    <span
                      className={`h-3 w-3 shrink-0 rounded-full ${color.dot}`}
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {
                          member.firstName
                        }{" "}
                        {
                          member.lastName
                        }
                      </p>

                      <p className="text-xs capitalize text-gray-500">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {weekDays.map(
                    (date) => {
                      const dateKey =
                        formatDateKey(
                          date,
                        );

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
                            onClick={() =>
                              openAvailabilityModal(
                                member,
                                dateKey,
                                availability,
                              )
                            }
                          />
                        </div>
                      );
                    },
                  )}
                </div>
              );
            },
          )}
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