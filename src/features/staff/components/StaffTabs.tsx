export type StaffTab =
  | "team"
  | "schedule"
  | "my-schedule"
  | "availability"
  | "hours";

type StaffTabsProps = {
  activeTab: StaffTab;
  onChange: (tab: StaffTab) => void;
};

const tabs: {
  label: string;
  value: StaffTab;
}[] = [
  {
    label: "Team",
    value: "team",
  },
  {
    label: "Schedule",
    value: "schedule",
  },
  {
    label: "My Schedule",
    value: "my-schedule",
  },
  {
    label: "Availability",
    value: "availability",
  },
  {
    label: "Hours & Pay",
    value: "hours",
  },
];

const StaffTabs = ({
  activeTab,
  onChange,
}: StaffTabsProps) => {
  return (
    <div
      role="tablist"
      className="flex min-w-0 flex-nowrap gap-1 overflow-x-auto rounded-2xl border border-(--color-border) bg-(--color-surface) p-2 shadow-sm"
    >
      {tabs.map((tab) => {
        const isActive =
          activeTab === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() =>
              onChange(tab.value)
            }
            className={`shrink-0 cursor-pointer whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-(--color-primary-soft) text-(--color-primary)"
                : "text-(--color-text-muted) hover:bg-(--color-surface-soft) hover:text-(--color-text)"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default StaffTabs;