import { useState } from "react";

import MyAssignmentCard from "./MyAssignmentCard";

import AssignmentReasonModal from "../../../assignments/components/AssignmentReasonModal";
import WorkSessionControls from "../../../hours-pay/components/WorkSessionControls";

import useAssignmentActions from "../../../assignments/hooks/useAssignmentActions";
import useWorkSessions from "../../../hours-pay/hooks/useWorkSessions";

import { useWorkTasksContext } from "../../../tasks/context/WorkTasksContext";
import { useEventsContext } from "../../../events/context/EventsContext";

import type { Assignment } from "../../../../types/assignment";
import type { WorkTask } from "../../../../types/workTask";

type MyScheduleProps = {
  staffId: string;
};

type ReasonAction = {
  assignment: Assignment;
  type: "decline" | "cancellation";
};

type WorkError = {
  assignmentId: string;
  message: string;
};

const cleaningTaskTypes: WorkTask["type"][] = [
  "room-cleaning",
  "property-cleaning",
  "event-cleaning",
];

const MySchedule = ({
  staffId,
}: MyScheduleProps) => {
  const {
    allAssignments,
    acceptAssignment,
    declineAssignment,
    requestCancellation,
  } = useAssignmentActions();

  const {
    getWorkSession,
    startWork,
    finishWork,
  } = useWorkSessions();

  const { taskList } =
    useWorkTasksContext();

  const { eventList } =
    useEventsContext();

  const [
    reasonAction,
    setReasonAction,
  ] = useState<ReasonAction | null>(null);

  const [
    workError,
    setWorkError,
  ] = useState<WorkError | null>(null);

  const myAssignments =
    allAssignments.filter(
      (assignment) =>
        assignment.staffId === staffId,
    );

  const scheduleItems = myAssignments
    .map((assignment) => {
      if (
        assignment.sourceType ===
        "work-task"
      ) {
        const task = taskList.find(
          (task) =>
            task.id ===
            assignment.sourceId,
        );

        if (!task) {
          return null;
        }

        return {
          assignment,
          title: task.title,
          date: task.date,
          startTime: task.startTime,
          endTime: undefined,
          sourceLabel: "Task" as const,
          area: task.area,
          instructions:
            task.instructions,
          taskId: task.id,
          isCleaningTask:
            cleaningTaskTypes.includes(
              task.type,
            ),
        };
      }

      const event = eventList.find(
        (event) =>
          event.id ===
          assignment.sourceId,
      );

      if (!event) {
        return null;
      }

      return {
        assignment,
        title: event.title,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        sourceLabel: "Event" as const,
        area: event.area,
        instructions:
          event.instructions,
        taskId: undefined,
        isCleaningTask: false,
      };
    })
    .filter(
      (
        item,
      ): item is NonNullable<
        typeof item
      > => item !== null,
    )
    .sort((a, b) => {
      const dateComparison =
        a.date.localeCompare(b.date);

      if (dateComparison !== 0) {
        return dateComparison;
      }

      return (
        a.startTime ?? ""
      ).localeCompare(
        b.startTime ?? "",
      );
    });

  const handleReasonSubmit = (
    reason: string,
  ) => {
    if (!reasonAction) {
      return;
    }

    if (
      reasonAction.type ===
      "decline"
    ) {
      declineAssignment(
        reasonAction.assignment,
        reason,
      );

      return;
    }

    requestCancellation(
      reasonAction.assignment,
      reason,
    );
  };

  const handleStartWork = (
    assignment: Assignment,
    taskId: string,
  ) => {
    setWorkError(null);

    const result = startWork(
      taskId,
      assignment.staffId,
    );

    if (!result.success && result.error) {
      setWorkError({
        assignmentId:
          assignment.id,
        message: result.error,
      });
    }
  };

  const handleFinishWork = (
    assignment: Assignment,
    taskId: string,
  ) => {
    setWorkError(null);

    const result = finishWork(
      taskId,
      assignment.staffId,
    );

    if (!result.success && result.error) {
      setWorkError({
        assignmentId:
          assignment.id,
        message: result.error,
      });
    }
  };

  return (
    <div className="min-w-0 space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
          Personal schedule
        </p>
  
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-(--color-text)">
          My Schedule
        </h2>
  
        <p className="mt-1 text-sm text-(--color-text-muted)">
          View and respond to your assigned work.
        </p>
      </div>
  
      {scheduleItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-(--color-border) bg-(--color-surface) p-8 text-center">
          <p className="text-sm font-semibold text-(--color-text)">
            Nothing assigned
          </p>
  
          <p className="mt-1 text-sm text-(--color-text-muted)">
            Your tasks and events will appear here.
          </p>
        </div>
      ) : (
        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
          {scheduleItems.map((item) => {
            const session =
              item.taskId
                ? getWorkSession(
                    item.taskId,
                    item.assignment.staffId,
                  )
                : undefined;
  
            const canTrackWork =
              item.isCleaningTask &&
              item.taskId &&
              item.assignment.status ===
                "confirmed";
  
            const controls = canTrackWork ? (
              <div className="space-y-2">
                <WorkSessionControls
                  session={session}
                  onStart={() =>
                    handleStartWork(
                      item.assignment,
                      item.taskId!,
                    )
                  }
                  onFinish={() =>
                    handleFinishWork(
                      item.assignment,
                      item.taskId!,
                    )
                  }
                />
  
                {workError?.assignmentId ===
                  item.assignment.id && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2">
                    <p className="text-sm font-medium text-red-700">
                      {workError.message}
                    </p>
                  </div>
                )}
              </div>
            ) : undefined;
  
            return (
              <MyAssignmentCard
                key={item.assignment.id}
                assignment={item.assignment}
                title={item.title}
                date={item.date}
                startTime={item.startTime}
                endTime={item.endTime}
                sourceLabel={
                  item.sourceLabel
                }
                area={item.area}
                instructions={
                  item.instructions
                }
                workControls={controls}
                onAccept={
                  acceptAssignment
                }
                onDecline={(
                  assignment,
                ) =>
                  setReasonAction({
                    assignment,
                    type: "decline",
                  })
                }
                onRequestCancellation={(
                  assignment,
                ) =>
                  setReasonAction({
                    assignment,
                    type:
                      "cancellation",
                  })
                }
              />
            );
          })}
        </div>
      )}
  
      {reasonAction && (
        <AssignmentReasonModal
          title={
            reasonAction.type ===
            "decline"
              ? "Decline Assignment"
              : "Request Cancellation"
          }
          description={
            reasonAction.type ===
            "decline"
              ? "Tell the manager why you cannot accept this assignment."
              : "Tell the manager why you can no longer complete this assignment."
          }
          submitLabel={
            reasonAction.type ===
            "decline"
              ? "Decline"
              : "Send Request"
          }
          onClose={() =>
            setReasonAction(null)
          }
          onSubmit={
            handleReasonSubmit
          }
        />
      )}
    </div>
  );
};

export default MySchedule;