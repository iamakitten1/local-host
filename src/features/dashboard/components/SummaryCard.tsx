import type {
  LucideIcon,
} from "lucide-react";

type SummaryCardProps = {
  title: string;
  value: number;
  icon?: LucideIcon;
};

const SummaryCard = ({
  title,
  value,
  icon: Icon,
}: SummaryCardProps) => {
  return (
    <div className="min-w-0 rounded-2xl border border-[#e7e5df] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            {value}
          </p>
        </div>

        {Icon && (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#edf3ef] text-[#3f6f60]">
            <Icon
              size={19}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;