import { useState } from "react";



import type { Staff } from "../../../types/staff";
import Modal from "../../../components/ui/Modal";

type PaymentInput = {
  propertyId: string;
  staffId: string;
  amount: number;
  paidAt: string;
  note?: string;
};

type PaymentResult = {
  success: boolean;
  error: string | null;
};

type RecordPaymentModalProps = {
  member: Staff;
  onClose: () => void;
  onSubmit: (
    payment: PaymentInput,
  ) => PaymentResult;
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

const RecordPaymentModal = ({
  member,
  onClose,
  onSubmit,
}: RecordPaymentModalProps) => {
  const [amount, setAmount] =
    useState("");

  const [paidAt, setPaidAt] =
    useState(getTodayDate());

  const [note, setNote] =
    useState("");

  const [error, setError] =
    useState("");

  return (
    <Modal
      title="Record Payment"
      onClose={onClose}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();

          setError("");

          const numericAmount =
            Number(amount);

          if (
            !Number.isFinite(
              numericAmount,
            ) ||
            numericAmount <= 0
          ) {
            setError(
              "Enter a valid payment amount.",
            );

            return;
          }

          const trimmedNote =
            note.trim();

          const result = onSubmit({
            propertyId:
              member.propertyId,
            staffId: member.id,
            amount: numericAmount,
            paidAt,
            ...(trimmedNote
              ? {
                  note: trimmedNote,
                }
              : {}),
          });

          if (!result.success) {
            setError(
              result.error ??
                "Could not record payment.",
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
        </div>

        <div>
          <label
            htmlFor="payment-amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>

          <div className="relative mt-1">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-gray-500">
              €
            </span>

            <input
              id="payment-amount"
              type="number"
              min="0.01"
              step="0.01"
              inputMode="decimal"
              value={amount}
              onChange={(event) =>
                setAmount(
                  event.target.value,
                )
              }
              placeholder="0.00"
              autoFocus
              className="w-full rounded-lg border border-gray-300 py-2 pl-8 pr-3 text-sm outline-none focus:border-gray-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="payment-date"
            className="block text-sm font-medium text-gray-700"
          >
            Payment date
          </label>

          <input
            id="payment-date"
            type="date"
            value={paidAt}
            onChange={(event) =>
              setPaidAt(
                event.target.value,
              )
            }
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="payment-note"
            className="block text-sm font-medium text-gray-700"
          >
            Note
            <span className="ml-1 font-normal text-gray-400">
              Optional
            </span>
          </label>

          <textarea
            id="payment-note"
            value={note}
            onChange={(event) =>
              setNote(
                event.target.value,
              )
            }
            rows={3}
            placeholder="e.g. Cash payment for this week"
            className="mt-1 w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          />
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
            Record Payment
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RecordPaymentModal;