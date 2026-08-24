import type { WorkTaskStatus } from "../../../../types/workTask";

type TaskStatusProps = {
  status: WorkTaskStatus;
  onChange: (
    status: WorkTaskStatus,
  ) => void;
};

const TaskStatus = ({
  status,
  onChange,
}: TaskStatusProps) => {
  return (
    <div className="min-w-0">
      <label
        htmlFor="task-status"
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        Status
      </label>

      <select
        id="task-status"
        value={status}
        onChange={(event) =>
          onChange(
            event.target
              .value as WorkTaskStatus,
          )
        }
        className="w-full min-w-0 cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
      >
        <option value="pending">
          Pending
        </option>

        <option value="in-progress">
          In progress
        </option>

        <option value="completed">
          Completed
        </option>

        <option value="cancelled">
          Cancelled
        </option>
      </select>
    </div>
  );
};

export default TaskStatus;