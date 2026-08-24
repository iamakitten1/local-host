import type {
  Bed,
  BedType,
} from "../../../types/room";

type BedEditorProps = {
  bed: Bed;

  onTypeChange: (
    type: BedType,
  ) => void;

  onQuantityChange: (
    quantity: number,
  ) => void;

  onDelete: () => void;
};

const BedEditor = ({
  bed,
  onTypeChange,
  onQuantityChange,
  onDelete,
}: BedEditorProps) => {
  return (
    <div className="min-w-0 rounded-lg bg-white p-3">
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="min-w-0">
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Bed type
          </label>

          <select
            value={bed.type}
            onChange={(event) =>
              onTypeChange(
                event.target
                  .value as BedType,
              )
            }
            className="w-full min-w-0 cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          >
            <option value="single">
              Single
            </option>

            <option value="double">
              Double
            </option>

            <option value="queen">
              Queen
            </option>

            <option value="king">
              King
            </option>

            <option value="sofa">
              Sofa
            </option>

            <option value="bunk">
              Bunk
            </option>

            <option value="baby">
              Baby
            </option>
          </select>
        </div>

        <div className="min-w-0">
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Quantity
          </label>

          <input
            type="number"
            min="1"
            value={bed.quantity}
            onChange={(event) =>
              onQuantityChange(
                Number(
                  event.target.value,
                ),
              )
            }
            className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          />
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={onDelete}
          className="cursor-pointer text-sm font-medium text-red-600 hover:text-red-700"
        >
          Remove bed
        </button>
      </div>
    </div>
  );
};

export default BedEditor;