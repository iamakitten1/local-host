import { useState } from "react";
import Modal from "../../../../components/ui/Modal";
import { staff } from "../../../../data/staff";

import type {
  WorkTask,
  WorkTaskPriority,
  WorkTaskStatus,
  WorkTaskType,
} from "../../../../types/workTask";

import TaskBasics from "./TaskBasics";
import TaskDetails from "./TaskDetails";
import TaskAssignees from "./TaskAssignees";
import TaskStatus from "./TaskStatus";

type WorkTaskFormModalProps = {
  task?: WorkTask;
  onClose: () => void;
  onSubmit: (task: WorkTask) => void;
};

const WorkTaskFormModal = ({
  task,
  onClose,
  onSubmit,
}: WorkTaskFormModalProps) => {
  const isEditing = Boolean(task);

  const [type, setType] = useState<WorkTaskType>(task?.type ?? "other");

  const [title, setTitle] = useState(task?.title ?? "");

  const [date, setDate] = useState(task?.date ?? "");

  const [startTime, setStartTime] = useState(task?.startTime ?? "");

  const [priority, setPriority] = useState<WorkTaskPriority>(
    task?.priority ?? "normal",
  );

  const [area, setArea] = useState(task?.area ?? "");

  const [instructions, setInstructions] = useState(task?.instructions ?? "");

  const [status, setStatus] = useState<WorkTaskStatus>(
    task?.status ?? "pending",
  );

  const [assignedStaffIds, setAssignedStaffIds] = useState<string[]>(
    task?.assignedStaffIds ?? [],
  );

  const [error, setError] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !date) {
      setError("Please add a title and date.");
      return;
    }

    const isCompleted = status === "completed";

    const savedTask: WorkTask = {
      id: task?.id ?? `task-${Date.now()}`,
      propertyId: task?.propertyId ?? "property-1",

      type,
      title: title.trim(),
      instructions: instructions.trim() || undefined,

      date,
      startTime: startTime || undefined,

      assignedStaffIds,

      roomId: task?.roomId,
      eventId: task?.eventId,

      area: area.trim() || undefined,

      status,
      priority,

      createdByStaffId: task?.createdByStaffId ?? "staff-1",
      createdAt: task?.createdAt ?? new Date().toISOString(),

      completedAt: isCompleted
        ? (task?.completedAt ?? new Date().toISOString())
        : undefined,

      completedByStaffId: isCompleted
        ? (task?.completedByStaffId ?? "staff-1")
        : undefined,
    };

    onSubmit(savedTask);
    onClose();
  };

  return (
    <Modal title={isEditing ? "Edit Task" : "Add Task"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 p-5">
        {error && <p className="text-sm text-red-600">{error}</p>}

        <TaskBasics
          type={type}
          title={title}
          date={date}
          startTime={startTime}
          priority={priority}
          onTypeChange={setType}
          onTitleChange={setTitle}
          onDateChange={setDate}
          onStartTimeChange={setStartTime}
          onPriorityChange={setPriority}
        />

        <TaskDetails
          area={area}
          instructions={instructions}
          onAreaChange={setArea}
          onInstructionsChange={setInstructions}
        />

        <TaskAssignees
          staffList={staff}
          assignedStaffIds={assignedStaffIds}
          onChange={setAssignedStaffIds}
        />

        {isEditing && <TaskStatus status={status} onChange={setStatus} />}

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
          >
            {isEditing ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default WorkTaskFormModal;
