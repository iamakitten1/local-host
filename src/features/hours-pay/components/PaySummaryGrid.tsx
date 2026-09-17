type PaySummaryGridProps = {
    worked: string;
    earned: number;
    paid: number;
    amountDue: number;
    credit: number;
  };
  
  const PaySummaryGrid = ({
    worked,
    earned,
    paid,
    amountDue,
    credit,
  }: PaySummaryGridProps) => {
    const balanceLabel =
      amountDue > 0
        ? "Due · all time"
        : credit > 0
          ? "Credit · all time"
          : "Balance · all time";
  
    const balanceAmount =
      amountDue > 0
        ? amountDue
        : credit > 0
          ? credit
          : 0;
  
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs font-medium text-gray-500">
            Worked
          </p>
  
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {worked}
          </p>
        </div>
  
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs font-medium text-gray-500">
            Earned
          </p>
  
          <p className="mt-1 text-lg font-semibold text-gray-900">
            €{earned.toFixed(2)}
          </p>
        </div>
  
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs font-medium text-gray-500">
            Paid
          </p>
  
          <p className="mt-1 text-lg font-semibold text-gray-900">
            €{paid.toFixed(2)}
          </p>
        </div>
  
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs font-medium text-gray-500">
            {balanceLabel}
          </p>
  
          <p className="mt-1 text-lg font-semibold text-gray-900">
            €{balanceAmount.toFixed(2)}
          </p>
        </div>
      </div>
    );
  };
  
  export default PaySummaryGrid;