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
    <>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Task type
        </label>

        <select
          value={type}
          onChange={(event) =>
            onTypeChange(event.target.value as WorkTaskType)
          }
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        >
          <option value="room-cleaning">Room cleaning</option>
          <option value="property-cleaning">Property cleaning</option>
          <option value="event-setup">Event setup</option>
          <option value="event-work">Event work</option>
          <option value="event-cleaning">Event cleaning</option>
          <option value="maintenance">Maintenance</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Prepare garden for party"
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Start time
          </label>

          <input
            type="time"
            value={startTime}
            onChange={(event) => onStartTimeChange(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Priority
        </label>

        <select
          value={priority}
          onChange={(event) =>
            onPriorityChange(
              event.target.value as WorkTaskPriority,
            )
          }
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        >
          <option value="normal">Normal</option>
          <option value="important">Important</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>
    </>
  );
};

export default TaskBasics;