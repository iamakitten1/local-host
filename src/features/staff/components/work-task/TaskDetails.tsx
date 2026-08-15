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
    <>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Area
        </label>

        <input
          type="text"
          value={area}
          onChange={(event) => onAreaChange(event.target.value)}
          placeholder="Garden, tavern, kitchen..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2"
        />

        <p className="mt-1 text-xs text-gray-500">
          Where this task takes place.
        </p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Instructions
        </label>

        <textarea
          value={instructions}
          onChange={(event) =>
            onInstructionsChange(event.target.value)
          }
          rows={5}
          placeholder="Describe what needs to be done..."
          className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>
    </>
  );
};

export default TaskDetails;