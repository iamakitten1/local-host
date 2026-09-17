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
    <div className="flex flex-wrap gap-2">
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
                ? "bg-gray-900 text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
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