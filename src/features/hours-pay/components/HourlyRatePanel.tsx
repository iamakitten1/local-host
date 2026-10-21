import type { StaffHourlyRate } from "../../../types/staffHourlyRate";

import { formatDate } from "../utils/hoursPayUtils";

type HourlyRatePanelProps = {
  currentRate: StaffHourlyRate | null;
  rateHistory: StaffHourlyRate[];
  onUpdateRate: () => void;
};

const HourlyRatePanel = ({
  currentRate,
  rateHistory,
  onUpdateRate,
}: HourlyRatePanelProps) => {
  return (
    <div className="min-w-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
            Current hourly rate
          </p>

          <p className="mt-1 text-lg font-semibold text-(--color-text)">
            {currentRate
              ? `€${currentRate.hourlyRate.toFixed(2)}/h`
              : "Not set"}
          </p>

          {currentRate && (
            <p className="mt-1 text-xs text-(--color-text-muted)">
              Effective from{" "}
              {formatDate(
                currentRate.effectiveFrom,
              )}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onUpdateRate}
          className="w-full cursor-pointer rounded-xl border border-(--color-border-strong) px-4 py-2 text-sm font-medium text-(--color-text) transition hover:bg-(--color-surface) sm:w-auto"
        >
          Update Rate
        </button>
      </div>

      {rateHistory.length > 0 && (
        <div className="mt-4 border-t border-(--color-border) pt-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
            Rate history
          </p>

          <div className="mt-2 space-y-2">
            {rateHistory.map(
              (rate) => (
                <div
                  key={rate.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-(--color-text-muted)">
                    {formatDate(
                      rate.effectiveFrom,
                    )}
                  </span>

                  <span className="font-medium text-(--color-text)">
                    €
                    {rate.hourlyRate.toFixed(
                      2,
                    )}
                    /h
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HourlyRatePanel;