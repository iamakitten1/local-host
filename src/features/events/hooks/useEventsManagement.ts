import { useEventsContext } from "../context/EventsContext";

import type { Event as LocalHostEvent } from "../../../types/event";
import type { Assignment } from "../../../types/assignment";

const useEventsManagement = () => {
  const {
    eventList,
    eventAssignmentList,
    setEventList,
    setEventAssignmentList,
  } = useEventsContext();

  const handleSaveEvent = (
    event: LocalHostEvent,
    selectedStaffIds: string[],
  ) => {
    setEventList((currentEvents) => {
      const eventExists = currentEvents.some(
        (currentEvent) =>
          currentEvent.id === event.id,
      );

      if (eventExists) {
        return currentEvents.map(
          (currentEvent) =>
            currentEvent.id === event.id
              ? event
              : currentEvent,
        );
      }

      return [...currentEvents, event];
    });

    setEventAssignmentList(
      (currentAssignments) => {
        const existingEventAssignments =
          currentAssignments.filter(
            (assignment) =>
              assignment.sourceType === "event" &&
              assignment.sourceId === event.id,
          );

        const otherAssignments =
          currentAssignments.filter(
            (assignment) =>
              !(
                assignment.sourceType === "event" &&
                assignment.sourceId === event.id
              ),
          );

        const nextEventAssignments =
          selectedStaffIds.map((staffId) => {
            const existingAssignment =
              existingEventAssignments.find(
                (assignment) =>
                  assignment.staffId === staffId,
              );

            if (existingAssignment) {
              return existingAssignment;
            }

            const newAssignment: Assignment = {
              id: `assignment-${Date.now()}-${staffId}`,
              propertyId: event.propertyId,
              sourceType: "event",
              sourceId: event.id,
              staffId,
              status: "pending",
              assignedByStaffId:
                event.createdByStaffId,
              assignedAt:
                new Date().toISOString(),
            };

            return newAssignment;
          });

        return [
          ...otherAssignments,
          ...nextEventAssignments,
        ];
      },
    );
  };

  const handleDeleteEvent = (
    eventId: string,
  ) => {
    const shouldDelete =
      window.confirm("Delete this event?");

    if (!shouldDelete) {
      return;
    }

    setEventList((currentEvents) =>
      currentEvents.filter(
        (event) => event.id !== eventId,
      ),
    );

    setEventAssignmentList(
      (currentAssignments) =>
        currentAssignments.filter(
          (assignment) =>
            !(
              assignment.sourceType === "event" &&
              assignment.sourceId === eventId
            ),
        ),
    );
  };

  const getEventStaffIds = (
    eventId: string,
  ) =>
    eventAssignmentList
      .filter(
        (assignment) =>
          assignment.sourceType === "event" &&
          assignment.sourceId === eventId &&
          assignment.status !== "cancelled" &&
          assignment.status !== "declined",
      )
      .map(
        (assignment) => assignment.staffId,
      );

  return {
    eventList,
    eventAssignmentList,
    handleSaveEvent,
    handleDeleteEvent,
    getEventStaffIds,
  };
};

export default useEventsManagement;