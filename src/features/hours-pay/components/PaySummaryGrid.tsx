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
      <div className="rounded-xl bg-(--color-surface-soft) p-3">
        <p className="text-xs font-medium text-(--color-text-muted)">
          Worked
        </p>

        <p className="mt-1 text-lg font-semibold text-(--color-text)">
          {worked}
        </p>
      </div>

      <div className="rounded-xl bg-(--color-surface-soft) p-3">
        <p className="text-xs font-medium text-(--color-text-muted)">
          Earned
        </p>

        <p className="mt-1 text-lg font-semibold text-(--color-text)">
          €{earned.toFixed(2)}
        </p>
      </div>

      <div className="rounded-xl bg-(--color-surface-soft) p-3">
        <p className="text-xs font-medium text-(--color-text-muted)">
          Paid
        </p>

        <p className="mt-1 text-lg font-semibold text-(--color-text)">
          €{paid.toFixed(2)}
        </p>
      </div>

      <div className="rounded-xl bg-(--color-primary-soft) p-3">
        <p className="text-xs font-medium text-(--color-primary-muted)">
          {balanceLabel}
        </p>

        <p className="mt-1 text-lg font-semibold text-(--color-primary)">
          €{balanceAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default PaySummaryGrid;