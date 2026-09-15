import type { Assignment } from "../../../types/assignment";

type AssignmentReviewActionsProps = {
  assignment: Assignment;
  onApprove: (assignment: Assignment) => void;
  onReject: (assignment: Assignment) => void;
};

const AssignmentReviewActions = ({
  assignment,
  onApprove,
  onReject,
}: AssignmentReviewActionsProps) => {
  if (
    assignment.status !==
    "cancellation-requested"
  ) {
    return null;
  }

  return (
    <div className="mt-2 rounded-lg border border-orange-200 bg-orange-50 p-3">
      <p className="text-xs font-semibold text-orange-700">
        Cancellation request
      </p>

      {assignment.cancellationReason && (
        <p className="mt-1 wrap-break-word text-sm text-orange-800">
          {assignment.cancellationReason}
        </p>
      )}

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() =>
            onReject(assignment)
          }
          className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
        >
          Reject request
        </button>

        <button
          type="button"
          onClick={() =>
            onApprove(assignment)
          }
          className="w-full cursor-pointer rounded-lg bg-orange-600 px-3 py-2 text-xs font-semibold text-white hover:bg-orange-700 sm:w-auto"
        >
          Approve cancellation
        </button>
      </div>
    </div>
  );
};

export default AssignmentReviewActions;