import { useState } from "react";

import RecordPaymentModal from "./RecordPaymentModal";
import usePayments from "../hooks/usePayments";

import type { Staff } from "../../../types/staff";
import type { WorkSession } from "../../../types/workSession";

type HoursPayTabProps = {
  staffList: Staff[];
  workSessionList: WorkSession[];
};

const getWorkedMinutes = (
  session: WorkSession,
) => {
  if (
    !session.startedAt ||
    !session.finishedAt
  ) {
    return 0;
  }

  const startedAt = new Date(
    session.startedAt,
  );

  const finishedAt = new Date(
    session.finishedAt,
  );

  return Math.max(
    0,
    Math.floor(
      (finishedAt.getTime() -
        startedAt.getTime()) /
        60000,
    ) - session.breakMinutes,
  );
};

const formatMinutes = (
  totalMinutes: number,
) => {
  const hours = Math.floor(
    totalMinutes / 60,
  );

  const minutes =
    totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
};

const formatDate = (
  date: string,
) =>
  new Date(
    `${date}T00:00:00`,
  ).toLocaleDateString();

const HoursPayTab = ({
  staffList,
  workSessionList,
}: HoursPayTabProps) => {
  const [
    selectedMember,
    setSelectedMember,
  ] = useState<Staff | null>(
    null,
  );

  const {
    recordPayment,
    getStaffPaymentSummary,
    getStaffPayments,
  } = usePayments();

  const cleaners = staffList.filter(
    (member) =>
      member.isActive &&
      member.role !== "owner" &&
      member.workTypes.includes(
        "cleaning",
      ),
  );

  return (
    <div className="min-w-0">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Hours & Pay
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Cleaning hours, earnings,
          payments, and balances
        </p>
      </div>

      {cleaners.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <p className="text-sm font-medium text-gray-700">
            No cleaners found
          </p>
        </div>
      ) : (
        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
          {cleaners.map(
            (member) => {
              const staffSessions =
                workSessionList.filter(
                  (session) =>
                    session.staffId ===
                    member.id,
                );

              const completedSessions =
                staffSessions.filter(
                  (session) =>
                    session.status ===
                    "completed",
                );

              const activeSession =
                staffSessions.find(
                  (session) =>
                    session.status ===
                    "in-progress",
                );

              const totalMinutes =
                completedSessions.reduce(
                  (
                    total,
                    session,
                  ) =>
                    total +
                    getWorkedMinutes(
                      session,
                    ),
                  0,
                );

              const summary =
                getStaffPaymentSummary(
                  member.id,
                );

              const payments =
                getStaffPayments(
                  member.id,
                );

              return (
                <article
                  key={member.id}
                  className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="wrap-break-word text-lg font-semibold text-gray-900">
                        {
                          member.firstName
                        }{" "}
                        {
                          member.lastName
                        }
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

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs font-medium text-gray-500">
                        Worked
                      </p>

                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {formatMinutes(
                          totalMinutes,
                        )}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs font-medium text-gray-500">
                        Earned
                      </p>

                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        €
                        {summary.totalEarned.toFixed(
                          2,
                        )}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs font-medium text-gray-500">
                        Paid
                      </p>

                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        €
                        {summary.totalPaid.toFixed(
                          2,
                        )}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs font-medium text-gray-500">
                        {summary.amountDue >
                        0
                          ? "Due"
                          : summary.credit >
                              0
                            ? "Credit"
                            : "Balance"}
                      </p>

                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        €
                        {summary.amountDue >
                        0
                          ? summary.amountDue.toFixed(
                              2,
                            )
                          : summary.credit >
                              0
                            ? summary.credit.toFixed(
                                2,
                              )
                            : "0.00"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedMember(
                          member,
                        )
                      }
                      className="w-full cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto"
                    >
                      Record Payment
                    </button>
                  </div>

                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Completed cleanings
                    </p>

                    {completedSessions.length ===
                    0 ? (
                      <p className="mt-2 text-sm text-gray-500">
                        No completed work
                        sessions yet.
                      </p>
                    ) : (
                      <div className="mt-2 space-y-2">
                        {completedSessions.map(
                          (
                            session,
                          ) => (
                            <div
                              key={
                                session.id
                              }
                              className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-2 text-sm first:border-t-0 first:pt-0"
                            >
                              <div>
                                <p className="font-medium text-gray-700">
                                  {formatMinutes(
                                    getWorkedMinutes(
                                      session,
                                    ),
                                  )}
                                </p>

                                <p className="text-xs text-gray-500">
                                  €
                                  {session.hourlyRate.toFixed(
                                    2,
                                  )}
                                  /h
                                </p>
                              </div>

                              <span className="font-semibold text-gray-900">
                                €
                                {session.earnedAmount.toFixed(
                                  2,
                                )}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Payment history
                    </p>

                    {payments.length ===
                    0 ? (
                      <p className="mt-2 text-sm text-gray-500">
                        No payments
                        recorded yet.
                      </p>
                    ) : (
                      <div className="mt-2 space-y-2">
                        {payments.map(
                          (
                            payment,
                          ) => (
                            <div
                              key={
                                payment.id
                              }
                              className="flex min-w-0 items-start justify-between gap-3 border-t border-gray-100 pt-2 first:border-t-0 first:pt-0"
                            >
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-700">
                                  {formatDate(
                                    payment.paidAt,
                                  )}
                                </p>

                                {payment.note && (
                                  <p className="mt-0.5 wrap-break-word text-xs text-gray-500">
                                    {
                                      payment.note
                                    }
                                  </p>
                                )}
                              </div>

                              <span className="shrink-0 text-sm font-semibold text-gray-900">
                                €
                                {payment.amount.toFixed(
                                  2,
                                )}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            },
          )}
        </div>
      )}

      {selectedMember && (
        <RecordPaymentModal
          member={selectedMember}
          onClose={() =>
            setSelectedMember(null)
          }
          onSubmit={recordPayment}
        />
      )}
    </div>
  );
};

export default HoursPayTab;