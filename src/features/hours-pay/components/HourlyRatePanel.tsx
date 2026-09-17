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
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Current hourly rate
          </p>

          <p className="mt-1 text-lg font-semibold text-gray-900">
            {currentRate
              ? `€${currentRate.hourlyRate.toFixed(2)}/h`
              : "Not set"}
          </p>

          {currentRate && (
            <p className="mt-1 text-xs text-gray-500">
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
          className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
        >
          Update Rate
        </button>
      </div>

      {rateHistory.length > 0 && (
        <div className="mt-4 border-t border-gray-100 pt-3">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Rate history
          </p>

          <div className="mt-2 space-y-2">
            {rateHistory.map(
              (rate) => (
                <div
                  key={rate.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-gray-500">
                    {formatDate(
                      rate.effectiveFrom,
                    )}
                  </span>

                  <span className="font-medium text-gray-700">
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