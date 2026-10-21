import type { PaymentRecord } from "../../../types/payment";

import { formatDate } from "../utils/hoursPayUtils";

type PaymentHistoryProps = {
  payments: PaymentRecord[];
};

const PaymentHistory = ({
  payments,
}: PaymentHistoryProps) => {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
        Payment history
      </p>

      {payments.length === 0 ? (
        <p className="mt-2 text-sm text-(--color-text-muted)">
          No payments in this period.
        </p>
      ) : (
        <div className="mt-3 space-y-2">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex min-w-0 items-start justify-between gap-3 border-t border-(--color-border) pt-2 first:border-t-0 first:pt-0"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-(--color-text)">
                  {formatDate(
                    payment.paidAt,
                  )}
                </p>

                {payment.note && (
                  <p className="mt-0.5 text-xs text-(--color-text-muted)">
                    {payment.note}
                  </p>
                )}
              </div>

              <span className="shrink-0 text-sm font-semibold text-(--color-text)">
                €
                {payment.amount.toFixed(
                  2,
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;