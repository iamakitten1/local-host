type TaskDetailsProps = {
  area: string;
  instructions: string;

  onAreaChange: (value: string) => void;
  onInstructionsChange: (value: string) => void;
};

const TaskDetails = ({
  area,
  instructions,
  onAreaChange,
  onInstructionsChange,
}: TaskDetailsProps) => {
  return (
    <div className="min-w-0 space-y-4">
      <div className="min-w-0">
        <label
          htmlFor="task-area"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Area
        </label>

        <input
          id="task-area"
          type="text"
          value={area}
          onChange={(event) =>
            onAreaChange(event.target.value)
          }
          placeholder="Garden, tavern, kitchen..."
          className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
        />

        <p className="mt-1 text-xs text-gray-500">
          Where this task takes place.
        </p>
      </div>

      <div className="min-w-0">
        <label
          htmlFor="task-instructions"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Instructions
        </label>

        <textarea
          id="task-instructions"
          value={instructions}
          onChange={(event) =>
            onInstructionsChange(event.target.value)
          }
          rows={5}
          placeholder="Describe what needs to be done..."
          className="w-full min-w-0 resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
        />
      </div>
    </div>
  );
};

export default TaskDetails;