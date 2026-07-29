import type { BedConfiguration, BedType } from "../../../types/room";
import BedEditor from "./BedEditor";

type BedConfigurationsEditorProps = {
  configurations: BedConfiguration[];
  onAddConfiguration: () => void;
  onConfigurationChange: (
    configurationId: string,
    field: "name" | "guestCapacity",
    value: string,
  ) => void;
  onAddBed: (configurationId: string) => void;
  onBedChange: (
    configurationId: string,
    bedIndex: number,
    field: "type" | "quantity",
    value: string,
  ) => void;
};

const BedConfigurationsEditor = ({
  configurations,
  onAddConfiguration,
  onConfigurationChange,
  onAddBed,
  onBedChange,
}: BedConfigurationsEditorProps) => {
  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-gray-900">
          Bed configurations
        </h3>

        <button
          type="button"
          onClick={onAddConfiguration}
          className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-gray-900"
        >
          + Add configuration
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {configurations.map((configuration) => (
          <div
            key={configuration.id}
            className="rounded-lg border border-gray-200 bg-gray-50 p-3"
          >
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  Configuration name
                </label>

                <input
                  type="text"
                  value={configuration.name}
                  onChange={(event) =>
                    onConfigurationChange(
                      configuration.id,
                      "name",
                      event.target.value,
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  Guest capacity
                </label>

                <input
                  type="number"
                  min="1"
                  value={configuration.guestCapacity}
                  onChange={(event) =>
                    onConfigurationChange(
                      configuration.id,
                      "guestCapacity",
                      event.target.value,
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
                />
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">
                    Beds: {configuration.beds.length}
                  </p>

                  <button
                    type="button"
                    onClick={() => onAddBed(configuration.id)}
                    className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-gray-900"
                  >
                    + Add bed
                  </button>
                </div>

                <div className="mt-3 space-y-2">
                  {configuration.beds.map((bed, bedIndex) => (
                    <BedEditor
                      key={bedIndex}
                      bed={bed}
                      onTypeChange={(type: BedType) =>
                        onBedChange(
                          configuration.id,
                          bedIndex,
                          "type",
                          type,
                        )
                      }
                      onQuantityChange={(quantity) =>
                        onBedChange(
                          configuration.id,
                          bedIndex,
                          "quantity",
                          String(quantity),
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BedConfigurationsEditor;