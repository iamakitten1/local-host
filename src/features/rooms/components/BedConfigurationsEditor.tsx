import type { BedConfiguration, BedType } from "../../../types/room";
import BedEditor from "./BedEditor";

type BedConfigurationsEditorProps = {
  configurations: BedConfiguration[];

  onAddConfiguration: () => void;

  onConfigurationNameChange: (configurationId: string, name: string) => void;

  onGuestCapacityChange: (
    configurationId: string,
    guestCapacity: number,
  ) => void;

  onAddBed: (configurationId: string) => void;

  onBedTypeChange: (
    configurationId: string,
    bedIndex: number,
    type: BedType,
  ) => void;

  onBedQuantityChange: (
    configurationId: string,
    bedIndex: number,
    quantity: number,
  ) => void;

  onDeleteBed: (configurationId: string, bedIndex: number) => void;

  onDeleteConfiguration: (configurationId: string) => void;
};

const BedConfigurationsEditor = ({
  configurations,
  onAddConfiguration,
  onConfigurationNameChange,
  onGuestCapacityChange,
  onAddBed,
  onBedTypeChange,
  onBedQuantityChange,
  onDeleteBed,
  onDeleteConfiguration,
}: BedConfigurationsEditorProps) => {
  return (
    <div className="border-t border-gray-200 pt-4">
      {/* Header */}
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

      {/* Configuration list */}
      <div className="mt-3 space-y-3">
        {configurations.map((configuration) => (
          <div
            key={configuration.id}
            className="rounded-lg border border-gray-200 bg-gray-50 p-3"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Configuration
                </span>

                <button
                  type="button"
                  onClick={() => onDeleteConfiguration(configuration.id)}
                  className="cursor-pointer text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              {/* Configuration name */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  Configuration name
                </label>

                <input
                  type="text"
                  value={configuration.name}
                  onChange={(event) =>
                    onConfigurationNameChange(
                      configuration.id,
                      event.target.value,
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
                />
              </div>

              {/* Guest capacity */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  Guest capacity
                </label>

                <input
                  type="number"
                  min="1"
                  value={configuration.guestCapacity}
                  onChange={(event) =>
                    onGuestCapacityChange(
                      configuration.id,
                      Number(event.target.value),
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
                />
              </div>

              {/* Beds */}
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

                {/* Bed list */}
                <div className="mt-3 space-y-2">
                  {configuration.beds.map((bed, bedIndex) => (
                    <BedEditor
                      key={bedIndex}
                      bed={bed}
                      onTypeChange={(type) =>
                        onBedTypeChange(configuration.id, bedIndex, type)
                      }
                      onQuantityChange={(quantity) =>
                        onBedQuantityChange(
                          configuration.id,
                          bedIndex,
                          quantity,
                        )
                      }
                      onDelete={() => onDeleteBed(configuration.id, bedIndex)}
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
