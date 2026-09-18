import type { Bed } from "../../../types/room";

type BedSetupSelectorProps = {
  availableBeds: Bed[];
  selectedBeds: Bed[];
  onChange: (beds: Bed[]) => void;
};

const BedSetupSelector = ({
  availableBeds,
  selectedBeds,
  onChange,
}: BedSetupSelectorProps) => {
  const getSelectedQuantity = (
    bedType: Bed["type"],
  ) => {
    return (
      selectedBeds.find(
        (bed) => bed.type === bedType,
      )?.quantity ?? 0
    );
  };

  const handleQuantityChange = (
    bedType: Bed["type"],
    quantity: number,
  ) => {
    const otherBeds =
      selectedBeds.filter(
        (bed) =>
          bed.type !== bedType,
      );

    if (quantity === 0) {
      onChange(otherBeds);
      return;
    }

    onChange([
      ...otherBeds,
      {
        type: bedType,
        quantity,
      },
    ]);
  };

  return (
    <div className="min-w-0 space-y-3">
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-gray-900">
          Bed setup
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Select the beds to prepare for this booking.
        </p>
      </div>

      <div className="space-y-2">
        {availableBeds.map((bed) => (
          <div
            key={bed.type}
            className="flex min-w-0 items-center justify-between gap-4 rounded-xl border border-[#e7e5df] bg-[#f8f7f3] p-3"
          >
            <div className="min-w-0">
              <p className="font-medium capitalize text-gray-800">
                {bed.type}
              </p>

              <p className="text-xs text-gray-500">
                Available: {bed.quantity}
              </p>
            </div>

            <select
              value={getSelectedQuantity(
                bed.type,
              )}
              onChange={(event) =>
                handleQuantityChange(
                  bed.type,
                  Number(
                    event.target.value,
                  ),
                )
              }
              aria-label={`Quantity of ${bed.type} beds`}
              className="shrink-0 cursor-pointer rounded-xl border border-[#ddd9d0] bg-white px-3 py-2 text-sm outline-none transition focus:border-[#5b7e72] focus:ring-2 focus:ring-[#5b7e72]/10"
            >
              {Array.from(
                {
                  length:
                    bed.quantity + 1,
                },
                (_, index) => index,
              ).map((quantity) => (
                <option
                  key={quantity}
                  value={quantity}
                >
                  {quantity}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BedSetupSelector;