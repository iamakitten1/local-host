import { useState } from "react";

import RecordPaymentModal from "./RecordPaymentModal";
import UpdateHourlyRateModal from "./UpdateHourlyRateModal";
import HoursPayPeriodFilter from "./HoursPayPeriodFilter";
import CleanerPayCard from "./CleanerPayCard";

import usePayments from "../hooks/usePayments";
import useHourlyRates from "../hooks/useHourlyRates";

import {
  formatMinutes,
  getWorkedMinutes,
  isDateInPeriod,
} from "../utils/hoursPayUtils";

import type { HoursPayPeriod } from "../types";
import type { Staff } from "../../../types/staff";
import type { WorkSession } from "../../../types/workSession";

type HoursPayTabProps = {
  staffList: Staff[];
  workSessionList: WorkSession[];
};

const HoursPayTab = ({ staffList, workSessionList }: HoursPayTabProps) => {
  const [paymentMember, setPaymentMember] = useState<Staff | null>(null);

  const [rateMember, setRateMember] = useState<Staff | null>(null);

  const [period, setPeriod] = useState<HoursPayPeriod>("month");

  const { recordPayment, getStaffPaymentSummary, getStaffPayments } =
    usePayments();

  const { getCurrentHourlyRate, getStaffRateHistory, updateHourlyRate } =
    useHourlyRates();

  const cleaners = staffList.filter(
    (member) =>
      member.isActive &&
      member.role !== "owner" &&
      member.workTypes.includes("cleaning"),
  );

  return (
    <div className="min-w-0">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Hours & Pay</h2>

          <p className="mt-1 text-sm text-gray-500">
            Cleaning hours, earnings, payments, balances, and hourly rates
          </p>
        </div>

        <HoursPayPeriodFilter value={period} onChange={setPeriod} />
      </div>

      {cleaners.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <p className="text-sm font-medium text-gray-700">No cleaners found</p>
        </div>
      ) : (
        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
          {cleaners.map((member) => {
            const staffSessions = workSessionList.filter(
              (session) => session.staffId === member.id,
            );

            const activeSession = staffSessions.find(
              (session) => session.status === "in-progress",
            );

            const completedSessions = staffSessions.filter(
              (session) =>
                session.status === "completed" &&
                session.finishedAt &&
                isDateInPeriod(new Date(session.finishedAt), period),
            );

            const totalMinutes = completedSessions.reduce(
              (total, session) => total + getWorkedMinutes(session),
              0,
            );

            const periodEarned = completedSessions.reduce(
              (total, session) => total + session.earnedAmount,
              0,
            );

            const summary = getStaffPaymentSummary(member.id);

            const payments = getStaffPayments(member.id).filter((payment) =>
              isDateInPeriod(new Date(`${payment.paidAt}T00:00:00`), period),
            );

            const periodPaid = payments.reduce(
              (total, payment) => total + payment.amount,
              0,
            );

            const currentRate = getCurrentHourlyRate(member.id);

            const rateHistory = getStaffRateHistory(member.id);

            return (
              <CleanerPayCard
                key={member.id}
                member={member}
                activeSession={activeSession}
                completedSessions={
                  completedSessions
                }
                worked={formatMinutes(
                  totalMinutes,
                )}
                earned={periodEarned}
                paid={periodPaid}
                amountDue={
                  summary.amountDue
                }
                credit={summary.credit}
                currentRate={currentRate}
                rateHistory={rateHistory}
                payments={payments}
                onRecordPayment={() =>
                  setPaymentMember(member)
                }
                onUpdateRate={() =>
                  setRateMember(member)
                }
              />
            );
          })}
        </div>
      )}

      {paymentMember && (
        <RecordPaymentModal
          member={paymentMember}
          onClose={() => setPaymentMember(null)}
          onSubmit={recordPayment}
        />
      )}

      {rateMember && (
        <UpdateHourlyRateModal
          member={rateMember}
          currentRate={getCurrentHourlyRate(rateMember.id)}
          onClose={() => setRateMember(null)}
          onSubmit={updateHourlyRate}
        />
      )}
    </div>
  );
};

export default HoursPayTab;
