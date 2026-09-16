import type { WorkSession } from "../../../types/workSession";

type WorkSessionControlsProps = {
  session?: WorkSession;
  onStart: () => void;
  onFinish: () => void;
};

const WorkSessionControls = ({
  session,
  onStart,
  onFinish,
}: WorkSessionControlsProps) => {
  if (!session) {
    return (
      <div className="border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={onStart}
          className="w-full cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto"
        >
          Start Work
        </button>
      </div>
    );
  }

  if (session.status === "in-progress") {
    return (
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-800">
              Work in progress
            </p>

            {session.startedAt && (
              <p className="mt-1 text-xs text-blue-700">
                Started at{" "}
                {new Date(
                  session.startedAt,
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onFinish}
            className="w-full cursor-pointer rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 sm:w-auto"
          >
            Finish Work
          </button>
        </div>
      </div>
    );
  }

  if (session.status === "completed") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-3">
        <p className="text-sm font-semibold text-green-800">
          Work completed
        </p>

        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-green-700">
          <span>
            Rate: €{session.hourlyRate.toFixed(2)}/h
          </span>

          <span>
            Earned: €{session.earnedAmount.toFixed(2)}
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export default WorkSessionControls;