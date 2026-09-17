import type { WorkSession } from "../../../types/workSession";

import {
  formatMinutes,
  getWorkedMinutes,
} from "../utils/hoursPayUtils";

type CompletedSessionsListProps = {
  sessions: WorkSession[];
};

const CompletedSessionsList = ({
  sessions,
}: CompletedSessionsListProps) => {
  return (
    <div className="border-t border-gray-100 pt-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        Completed cleanings
      </p>

      {sessions.length === 0 ? (
        <p className="mt-2 text-sm text-gray-500">
          No completed work sessions in this period.
        </p>
      ) : (
        <div className="mt-2 space-y-2">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-2 text-sm first:border-t-0 first:pt-0"
            >
              <div>
                <p className="font-medium text-gray-700">
                  {formatMinutes(
                    getWorkedMinutes(session),
                  )}
                </p>

                <p className="text-xs text-gray-500">
                  €{session.hourlyRate.toFixed(2)}/h
                </p>
              </div>

              <span className="font-semibold text-gray-900">
                €{session.earnedAmount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedSessionsList;