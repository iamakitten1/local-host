import type {
  WorkTaskPriority,
  WorkTaskType,
} from "../../../../types/workTask";

type TaskBasicsProps = {
  type: WorkTaskType;
  title: string;
  date: string;
  startTime: string;
  priority: WorkTaskPriority;

  onTypeChange: (value: WorkTaskType) => void;
  onTitleChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onStartTimeChange: (value: string) => void;
  onPriorityChange: (value: WorkTaskPriority) => void;
};

const TaskBasics = ({
  type,
  title,
  date,
  startTime,
  priority,
  onTypeChange,
  onTitleChange,
  onDateChange,
  onStartTimeChange,
  onPriorityChange,
}: TaskBasicsProps) => {
  return (
    <div className="min-w-0 space-y-4">
      {/* Task type + Priority */}
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label
            htmlFor="task-type"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Task type
          </label>

          <select
            id="task-type"
            value={type}
            onChange={(event) =>
              onTypeChange(
                event.target.value as WorkTaskType,
              )
            }
            className="w-full min-w-0 cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
          >
            <option value="room-cleaning">
              Room cleaning
            </option>

            <option value="property-cleaning">
              Property cleaning
            </option>

            <option value="event-cleaning">
              Event cleaning
            </option>

            <option value="maintenance">
              Maintenance
            </option>

            <option value="other">
              Other
            </option>
          </select>
        </div>

        <div className="min-w-0">
          <label
            htmlFor="task-priority"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Priority
          </label>

          <select
            id="task-priority"
            value={priority}
            onChange={(event) =>
              onPriorityChange(
                event.target.value as WorkTaskPriority,
              )
            }
            className="w-full min-w-0 cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
          >
            <option value="normal">
              Normal
            </option>

            <option value="important">
              Important
            </option>

            <option value="urgent">
              Urgent
            </option>
          </select>
        </div>
      </div>

      {/* Title */}
      <div className="min-w-0">
        <label
          htmlFor="task-title"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Title
        </label>

        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(event) =>
            onTitleChange(event.target.value)
          }
          placeholder="Prepare garden for party"
          className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
        />
      </div>

      {/* Date + Time */}
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label
            htmlFor="task-date"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Date
          </label>

          <input
            id="task-date"
            type="date"
            value={date}
            onChange={(event) =>
              onDateChange(event.target.value)
            }
            className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="task-start-time"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Start time
          </label>

          <input
            id="task-start-time"
            type="time"
            value={startTime}
            onChange={(event) =>
              onStartTimeChange(event.target.value)
            }
            className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskBasics;