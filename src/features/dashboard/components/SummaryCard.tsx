type SummaryCardProps = {
    title: string;
    value: number;
  };
  
  const SummaryCard = ({ title, value }: SummaryCardProps) => {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">{title}</p>
  
        <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      </div>
    );
  };
  
  export default SummaryCard;