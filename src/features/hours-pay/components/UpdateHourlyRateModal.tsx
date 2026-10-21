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

const fieldClasses =
  "w-full rounded-xl border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary-muted) focus:ring-2 focus:ring-(--color-primary-soft)";

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
        className="min-w-0"
      >
        <div className="space-y-5 p-4 sm:p-5">
          <div className="rounded-2xl border border-(--color-border) bg-(--color-surface-soft) p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
              Staff member
            </p>

            <p className="mt-1 font-semibold text-(--color-text)">
              {member.firstName}{" "}
              {member.lastName}
            </p>

            <p className="mt-2 text-sm text-(--color-text-muted)">
              Current rate:{" "}
              <span className="font-medium text-(--color-text)">
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
              className="block text-sm font-medium text-(--color-text)"
            >
              New hourly rate
            </label>

            <div className="relative mt-1.5">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-(--color-text-muted)">
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
                className={`${fieldClasses} pl-8 pr-12`}
              />

              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-(--color-text-muted)">
                /h
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="effective-from"
              className="block text-sm font-medium text-(--color-text)"
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
              className={`${fieldClasses} mt-1.5`}
            />

            <p className="mt-1.5 text-xs text-(--color-text-muted)">
              Existing work sessions keep
              their original rate.
            </p>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3">
              <p className="text-sm font-medium text-red-700">
                {error}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-(--color-border) p-4 sm:flex-row sm:justify-end sm:p-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-xl border border-(--color-border-strong) px-4 py-2.5 text-sm font-medium text-(--color-text) transition hover:bg-(--color-surface-soft) sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) sm:w-auto"
          >
            Save Rate
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateHourlyRateModal;