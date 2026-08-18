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
    <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-3">
      <button
        type="button"
        onClick={() => onChange("team")}
        className={`rounded-lg px-4 py-2 text-sm font-medium ${
          activeTab === "team"
            ? "bg-gray-900 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Team
      </button>

      <button
        type="button"
        onClick={() => onChange("schedule")}
        className={`rounded-lg px-4 py-2 text-sm font-medium ${
          activeTab === "schedule"
            ? "bg-gray-900 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Schedule
      </button>
      <button
  type="button"
  onClick={() => onChange("availability")}
  className={`rounded-lg px-4 py-2 text-sm font-medium ${
    activeTab === "availability"
      ? "bg-gray-900 text-white"
      : "text-gray-600 hover:bg-gray-100"
  }`}
>
  Availability
</button>
      <button
        type="button"
        onClick={() => onChange("hours")}
        className={`rounded-lg px-4 py-2 text-sm font-medium ${
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