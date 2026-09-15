import { useWorkTasksContext } from "../../tasks/context/WorkTasksContext";
import { useEventsContext } from "../../events/context/EventsContext";

import type { Assignment } from "../../../types/assignment";

type AssignmentSourceType =
  Assignment["sourceType"];

const useAssignmentActions = () => {
  const {
    assignmentList,
    setAssignmentList,
  } = useWorkTasksContext();

  const {
    eventAssignmentList,
    setEventAssignmentList,
  } = useEventsContext();

  const updateAssignment = (
    sourceType: AssignmentSourceType,
    assignmentId: string,
    updater: (
      assignment: Assignment,
    ) => Assignment,
  ) => {
    const setAssignments =
      sourceType === "work-task"
        ? setAssignmentList
        : setEventAssignmentList;

    setAssignments((currentAssignments) =>
      currentAssignments.map(
        (assignment) =>
          assignment.id === assignmentId
            ? updater(assignment)
            : assignment,
      ),
    );
  };

  const acceptAssignment = (
    assignment: Assignment,
  ) => {
    if (assignment.status !== "pending") {
      return;
    }

    updateAssignment(
      assignment.sourceType,
      assignment.id,
      (currentAssignment) => ({
        ...currentAssignment,
        status: "confirmed",
        respondedAt:
          new Date().toISOString(),
        declineReason: undefined,
      }),
    );
  };

  const declineAssignment = (
    assignment: Assignment,
    reason: string,
  ) => {
    const trimmedReason = reason.trim();

    if (
      assignment.status !== "pending" ||
      !trimmedReason
    ) {
      return;
    }

    updateAssignment(
      assignment.sourceType,
      assignment.id,
      (currentAssignment) => ({
        ...currentAssignment,
        status: "declined",
        respondedAt:
          new Date().toISOString(),
        declineReason: trimmedReason,
      }),
    );
  };

  const requestCancellation = (
    assignment: Assignment,
    reason: string,
  ) => {
    const trimmedReason = reason.trim();

    if (
      assignment.status !== "confirmed" ||
      !trimmedReason
    ) {
      return;
    }

    updateAssignment(
      assignment.sourceType,
      assignment.id,
      (currentAssignment) => ({
        ...currentAssignment,
        status:
          "cancellation-requested",
        cancellationRequestedAt:
          new Date().toISOString(),
        cancellationReason:
          trimmedReason,
      }),
    );
  };

  const approveCancellation = (
    assignment: Assignment,
  ) => {
    if (
      assignment.status !==
      "cancellation-requested"
    ) {
      return;
    }

    updateAssignment(
      assignment.sourceType,
      assignment.id,
      (currentAssignment) => ({
        ...currentAssignment,
        status: "cancelled",
        cancelledAt:
          new Date().toISOString(),
      }),
    );
  };

  const rejectCancellation = (
    assignment: Assignment,
  ) => {
    if (
      assignment.status !==
      "cancellation-requested"
    ) {
      return;
    }

    updateAssignment(
      assignment.sourceType,
      assignment.id,
      (currentAssignment) => ({
        ...currentAssignment,
        status: "confirmed",
        cancellationRequestedAt:
          undefined,
        cancellationReason:
          undefined,
      }),
    );
  };

  const allAssignments = [
    ...assignmentList,
    ...eventAssignmentList,
  ];

  return {
    allAssignments,
    acceptAssignment,
    declineAssignment,
    requestCancellation,
    approveCancellation,
    rejectCancellation,
  };
};

export default useAssignmentActions;