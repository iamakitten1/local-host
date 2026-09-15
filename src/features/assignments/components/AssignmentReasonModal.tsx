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
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedReason = reason.trim();

    if (!trimmedReason) {
      setError("Please provide a reason.");
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
        className="min-w-0 p-4 sm:p-5"
      >
        <p className="wrap-break-word text-sm text-gray-600">
          {description}
        </p>

        <div className="mt-4 min-w-0">
          <label
            htmlFor="assignment-reason"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Reason
          </label>

          <textarea
            id="assignment-reason"
            rows={4}
            value={reason}
            onChange={(event) => {
              setReason(event.target.value);

              if (error) {
                setError("");
              }
            }}
            placeholder="Write a short reason..."
            className="w-full min-w-0 resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
          />
        </div>

        {error && (
          <p className="mt-2 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
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
            {submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AssignmentReasonModal;