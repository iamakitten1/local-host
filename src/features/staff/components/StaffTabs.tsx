export type StaffTab =
  | "team"
  | "schedule"
  | "availability"
  | "hours";

type StaffTabsProps = {
  activeTab: StaffTab;
  onChange: (tab: StaffTab) => void;
};

const StaffTabs = ({
  activeTab,
  onChange,
}: StaffTabsProps) => {
  return (
    <div
      role="tablist"
      className="mb-6 flex min-w-0 flex-nowrap gap-2 overflow-x-auto border-b border-gray-200 pb-3"
    >
      <button
        type="button"
        role="tab"
        aria-selected={
          activeTab === "team"
        }
        onClick={() =>
          onChange("team")
        }
        className={`shrink-0 cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ${
          activeTab === "team"
            ? "bg-gray-900 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Team
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={
          activeTab === "schedule"
        }
        onClick={() =>
          onChange("schedule")
        }
        className={`shrink-0 cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ${
          activeTab === "schedule"
            ? "bg-gray-900 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Schedule
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={
          activeTab === "availability"
        }
        onClick={() =>
          onChange("availability")
        }
        className={`shrink-0 cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ${
          activeTab === "availability"
            ? "bg-gray-900 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Availability
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={
          activeTab === "hours"
        }
        onClick={() =>
          onChange("hours")
        }
        className={`shrink-0 cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ${
          activeTab === "hours"
            ? "bg-gray-900 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Hours & Pay
      </button>
    </div>
  );
};

export default StaffTabs;