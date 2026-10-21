import {
  CircleDollarSign,
  UserRound,
} from "lucide-react";

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
    <article className="min-w-0 rounded-3xl border border-(--color-border) bg-(--color-surface) p-5 shadow-sm">
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-(--color-primary-soft) text-(--color-primary)">
            <UserRound
              size={20}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight text-(--color-text)">
              {member.firstName}{" "}
              {member.lastName}
            </h3>

            <p className="mt-1 text-sm text-(--color-text-muted)">
              Cleaner
            </p>
          </div>
        </div>

        {activeSession && (
          <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
            Working now
          </span>
        )}
      </div>

      <div className="mt-5">
        <PaySummaryGrid
          worked={worked}
          earned={earned}
          paid={paid}
          amountDue={amountDue}
          credit={credit}
        />
      </div>

      <div className="mt-5 rounded-2xl border border-(--color-border) bg-(--color-surface-soft) p-4">
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
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) sm:w-auto"
        >
          <CircleDollarSign
            size={17}
            strokeWidth={1.9}
            aria-hidden="true"
          />

          Record Payment
        </button>
      </div>

      <div className="mt-5 border-t border-(--color-border) pt-5">
        <CompletedSessionsList
          sessions={completedSessions}
        />
      </div>

      <div className="mt-5 border-t border-(--color-border) pt-5">
        <PaymentHistory
          payments={payments}
        />
      </div>
    </article>
  );
};

export default CleanerPayCard;