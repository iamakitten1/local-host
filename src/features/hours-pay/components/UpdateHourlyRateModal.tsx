import { useState } from "react";



import type { Staff } from "../../../types/staff";
import type { StaffHourlyRate } from "../../../types/staffHourlyRate";
import Modal from "../../../components/ui/Modal";

type UpdateRateInput = {
  propertyId: string;
  staffId: string;
  hourlyRate: number;
  effectiveFrom: string;
};

type UpdateRateResult = {
  success: boolean;
  error: string | null;
};

type UpdateHourlyRateModalProps = {
  member: Staff;
  currentRate: StaffHourlyRate | null;

  onClose: () => void;

  onSubmit: (
    input: UpdateRateInput,
  ) => UpdateRateResult;
};

const getTodayDate = () => {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(
    today.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const UpdateHourlyRateModal = ({
  member,
  currentRate,
  onClose,
  onSubmit,
}: UpdateHourlyRateModalProps) => {
  const [hourlyRate, setHourlyRate] =
    useState("");

  const [
    effectiveFrom,
    setEffectiveFrom,
  ] = useState(getTodayDate());

  const [error, setError] =
    useState("");

  return (
    <Modal
      title="Update Hourly Rate"
      onClose={onClose}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();

          setError("");

          const numericRate =
            Number(hourlyRate);

          if (
            !Number.isFinite(
              numericRate,
            ) ||
            numericRate <= 0
          ) {
            setError(
              "Enter a valid hourly rate.",
            );

            return;
          }

          const result = onSubmit({
            propertyId:
              member.propertyId,
            staffId: member.id,
            hourlyRate: numericRate,
            effectiveFrom,
          });

          if (!result.success) {
            setError(
              result.error ??
                "Could not update hourly rate.",
            );

            return;
          }

          onClose();
        }}
        className="space-y-5 p-4 sm:p-5"
      >
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Staff member
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {member.firstName}{" "}
            {member.lastName}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Current rate:{" "}
            <span className="font-medium text-gray-700">
              {currentRate
                ? `€${currentRate.hourlyRate.toFixed(
                    2,
                  )}/h`
                : "Not set"}
            </span>
          </p>
        </div>

        <div>
          <label
            htmlFor="hourly-rate"
            className="block text-sm font-medium text-gray-700"
          >
            New hourly rate
          </label>

          <div className="relative mt-1">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-gray-500">
              €
            </span>

            <input
              id="hourly-rate"
              type="number"
              min="0.01"
              step="0.01"
              inputMode="decimal"
              value={hourlyRate}
              onChange={(event) =>
                setHourlyRate(
                  event.target.value,
                )
              }
              placeholder="0.00"
              autoFocus
              className="w-full rounded-lg border border-gray-300 py-2 pl-8 pr-12 text-sm outline-none focus:border-gray-500"
            />

            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-400">
              /h
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="effective-from"
            className="block text-sm font-medium text-gray-700"
          >
            Effective from
          </label>

          <input
            id="effective-from"
            type="date"
            value={effectiveFrom}
            onChange={(event) =>
              setEffectiveFrom(
                event.target.value,
              )
            }
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          />

          <p className="mt-1 text-xs text-gray-500">
            Existing work sessions keep
            their original rate.
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-3">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        <div className="flex flex-col-reverse gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto"
          >
            Save Rate
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateHourlyRateModal;