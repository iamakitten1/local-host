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
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
        Completed cleanings
      </p>

      {sessions.length === 0 ? (
        <p className="mt-2 text-sm text-(--color-text-muted)">
          No completed work sessions in this period.
        </p>
      ) : (
        <div className="mt-3 space-y-2">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex flex-wrap items-center justify-between gap-2 border-t border-(--color-border) pt-2 text-sm first:border-t-0 first:pt-0"
            >
              <div>
                <p className="font-medium text-(--color-text)">
                  {formatMinutes(
                    getWorkedMinutes(session),
                  )}
                </p>

                <p className="text-xs text-(--color-text-muted)">
                  €
                  {session.hourlyRate.toFixed(
                    2,
                  )}
                  /h
                </p>
              </div>

              <span className="font-semibold text-(--color-text)">
                €
                {session.earnedAmount.toFixed(
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

export default CompletedSessionsList;