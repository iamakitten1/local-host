import { useState } from "react";

import EventCard from "../features/events/components/EventCard";
import EventFormModal from "../features/events/components/EventFormModal";

import useEventsManagement from "../features/events/hooks/useEventsManagement";
import { useStaffContext } from "../features/staff/context/StaffContext";

const EventsPage = () => {
  const [isAddEventOpen, setIsAddEventOpen] =
    useState(false);

  const {
    eventList,
    eventAssignmentList,
    handleSaveEvent,
  } = useEventsManagement();

  const { staffList } = useStaffContext();

  return (
    <div className="min-w-0">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Events
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Plan events and manage staffing
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsAddEventOpen(true)
          }
          className="w-full shrink-0 cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto"
        >
          + Add Event
        </button>
      </div>

      {eventList.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <p className="text-sm font-medium text-gray-700">
            No events yet
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Create an event to start planning
            staff and event details.
          </p>
        </div>
      ) : (
        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
          {eventList.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              assignments={eventAssignmentList.filter(
                (assignment) =>
                  assignment.sourceId ===
                  event.id,
              )}
              staffList={staffList}
            />
          ))}
        </div>
      )}

      {isAddEventOpen && (
        <EventFormModal
          staffList={staffList}
          onClose={() =>
            setIsAddEventOpen(false)
          }
          onSubmit={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default EventsPage;