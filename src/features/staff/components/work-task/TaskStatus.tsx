import type { WorkTaskStatus } from "../../../../types/workTask";

type TaskStatusProps = {
  status: WorkTaskStatus;
  onChange: (status: WorkTaskStatus) => void;
};

const TaskStatus = ({
  status,
  onChange,
}: TaskStatusProps) => {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        Status
      </label>

      <select
        value={status}
        onChange={(event) =>
          onChange(event.target.value as WorkTaskStatus)
        }
        className="w-full rounded-lg border border-gray-300 px-3 py-2"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In progress</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  );
};

export default TaskStatus;