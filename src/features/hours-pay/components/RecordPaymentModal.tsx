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

const fieldClasses =
  "w-full rounded-xl border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary-muted) focus:ring-2 focus:ring-(--color-primary-soft)";

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
          </div>

          <div>
            <label
              htmlFor="payment-amount"
              className="block text-sm font-medium text-(--color-text)"
            >
              Amount
            </label>

            <div className="relative mt-1.5">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-(--color-text-muted)">
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
                className={`${fieldClasses} pl-8`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="payment-date"
              className="block text-sm font-medium text-(--color-text)"
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
              className={`${fieldClasses} mt-1.5`}
            />
          </div>

          <div>
            <label
              htmlFor="payment-note"
              className="block text-sm font-medium text-(--color-text)"
            >
              Note
              <span className="ml-1 font-normal text-(--color-text-muted)">
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
              className={`${fieldClasses} mt-1.5 resize-none`}
            />
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
            Record Payment
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RecordPaymentModal;