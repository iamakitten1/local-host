import PaySummaryGrid from "./PaySummaryGrid";
import HourlyRatePanel from "./HourlyRatePanel";
import CompletedSessionsList from "./CompletedSessionsList";
import PaymentHistory from "./PaymentHistory";

import type { Staff } from "../../../types/staff";
import type { WorkSession } from "../../../types/workSession";
import type { StaffHourlyRate } from "../../../types/staffHourlyRate";
import type { PaymentRecord } from "../../../types/payment";

type CleanerPayCardProps = {
  member: Staff;

  activeSession?: WorkSession;

  completedSessions: WorkSession[];

  worked: string;
  earned: number;
  paid: number;
  amountDue: number;
  credit: number;

  currentRate: StaffHourlyRate | null;
  rateHistory: StaffHourlyRate[];

  payments: PaymentRecord[];

  onRecordPayment: () => void;
  onUpdateRate: () => void;
};

const CleanerPayCard = ({
  member,
  activeSession,
  completedSessions,
  worked,
  earned,
  paid,
  amountDue,
  credit,
  currentRate,
  rateHistory,
  payments,
  onRecordPayment,
  onUpdateRate,
}: CleanerPayCardProps) => {
  return (
    <article className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="wrap-break-word text-lg font-semibold text-gray-900">
            {member.firstName}{" "}
            {member.lastName}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Cleaner
          </p>
        </div>

        {activeSession && (
          <span className="w-fit shrink-0 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
            Working now
          </span>
        )}
      </div>

      <div className="mt-4">
        <PaySummaryGrid
          worked={worked}
          earned={earned}
          paid={paid}
          amountDue={amountDue}
          credit={credit}
        />
      </div>

      <div className="mt-5">
        <HourlyRatePanel
          currentRate={currentRate}
          rateHistory={rateHistory}
          onUpdateRate={onUpdateRate}
        />
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={onRecordPayment}
          className="w-full cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto"
        >
          Record Payment
        </button>
      </div>

      <div className="mt-5">
        <CompletedSessionsList
          sessions={completedSessions}
        />
      </div>

      <div className="mt-5">
        <PaymentHistory
          payments={payments}
        />
      </div>
    </article>
  );
};

export default CleanerPayCard;