import type { HoursPayPeriod } from "../types";

type HoursPayPeriodFilterProps = {
  value: HoursPayPeriod;
  onChange: (
    period: HoursPayPeriod,
  ) => void;
};

const options: {
  value: HoursPayPeriod;
  label: string;
}[] = [
  {
    value: "week",
    label: "This week",
  },
  {
    value: "month",
    label: "This month",
  },
  {
    value: "all",
    label: "All time",
  },
];

const HoursPayPeriodFilter = ({
  value,
  onChange,
}: HoursPayPeriodFilterProps) => {
  return (
    <div className="flex flex-wrap gap-1 rounded-xl border border-(--color-border) bg-(--color-surface) p-1 shadow-sm">
      {options.map((option) => {
        const isActive =
          value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() =>
              onChange(option.value)
            }
            className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-(--color-primary-soft) text-(--color-primary)"
                : "text-(--color-text-muted) hover:bg-(--color-surface-soft) hover:text-(--color-text)"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default HoursPayPeriodFilter;