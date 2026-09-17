import type { PaymentRecord } from "../../../types/payment";

import { formatDate } from "../utils/hoursPayUtils";

type PaymentHistoryProps = {
  payments: PaymentRecord[];
};

const PaymentHistory = ({
  payments,
}: PaymentHistoryProps) => {
  return (
    <div className="border-t border-gray-100 pt-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        Payment history
      </p>

      {payments.length === 0 ? (
        <p className="mt-2 text-sm text-gray-500">
          No payments in this period.
        </p>
      ) : (
        <div className="mt-2 space-y-2">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex min-w-0 items-start justify-between gap-3 border-t border-gray-100 pt-2 first:border-t-0 first:pt-0"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-700">
                  {formatDate(payment.paidAt)}
                </p>

                {payment.note && (
                  <p className="mt-0.5 wrap-break-word text-xs text-gray-500">
                    {payment.note}
                  </p>
                )}
              </div>

              <span className="shrink-0 text-sm font-semibold text-gray-900">
                €{payment.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;