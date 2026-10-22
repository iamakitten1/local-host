import { useState } from "react";

import Modal from "../../../components/ui/Modal";

type AssignmentReasonModalProps = {
  title: string;
  description: string;
  submitLabel: string;
  onClose: () => void;
  onSubmit: (reason: string) => void;
};

const AssignmentReasonModal = ({
  title,
  description,
  submitLabel,
  onClose,
  onSubmit,
}: AssignmentReasonModalProps) => {
  const [reason, setReason] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedReason =
      reason.trim();

    if (!trimmedReason) {
      setError(
        "Please provide a reason.",
      );
      return;
    }

    setError("");

    onSubmit(trimmedReason);
    onClose();
  };

  return (
    <Modal
      title={title}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="min-w-0"
      >
        <div className="space-y-4 p-4 sm:p-5">
          <p className="text-sm text-(--color-text-muted)">
            {description}
          </p>

          <div>
            <label
              htmlFor="assignment-reason"
              className="mb-1.5 block text-sm font-medium text-(--color-text)"
            >
              Reason
            </label>

            <textarea
              id="assignment-reason"
              rows={4}
              value={reason}
              onChange={(event) => {
                setReason(
                  event.target.value,
                );

                if (error) {
                  setError("");
                }
              }}
              placeholder="Write a short reason..."
              className="w-full min-w-0 resize-y rounded-xl border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary-muted) focus:ring-2 focus:ring-(--color-primary-soft)"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5">
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
            {submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AssignmentReasonModal;