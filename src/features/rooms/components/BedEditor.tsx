import type { Bed, BedType } from "../../../types/room";

type BedEditorProps = {
  bed: Bed;
  onTypeChange: (type: BedType) => void;
  onQuantityChange: (quantity: number) => void;
};

const BedEditor = ({
  bed,
  onTypeChange,
  onQuantityChange,
}: BedEditorProps) => {
  return (
    <div className="grid grid-cols-1 gap-2 rounded-lg bg-white p-2 sm:grid-cols-2">
      {/* Bed type */}
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-600">
          Bed type
        </label>

        <select
          value={bed.type}
          onChange={(event) => onTypeChange(event.target.value as BedType)}
          className="w-full cursor-pointer rounded-lg border border-gray-300 px-2 py-2 text-sm outline-none focus:border-gray-500"
        >
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="queen">Queen</option>
          <option value="king">King</option>
          <option value="sofa">Sofa</option>
          <option value="bunk">Bunk</option>
          <option value="baby">Baby</option>
        </select>
      </div>

      {/* Quantity */}
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-600">
          Quantity
        </label>

        <input
          type="number"
          min="1"
          value={bed.quantity}
          onChange={(event) =>
            onQuantityChange(Number(event.target.value))
          }
          className="w-full rounded-lg border border-gray-300 px-2 py-2 text-sm outline-none focus:border-gray-500"
        />
      </div>
    </div>
  );
};

export default BedEditor;