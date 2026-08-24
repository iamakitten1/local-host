type SummaryCardProps = {
  title: string;
  value: number;
};

const SummaryCard = ({
  title,
  value,
}: SummaryCardProps) => {
  return (
    <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
        {value}
      </p>
    </div>
  );
};

export default SummaryCard;