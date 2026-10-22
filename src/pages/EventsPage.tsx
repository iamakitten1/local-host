import { useState } from "react";
import {
  CalendarDays,
  Plus,
} from "lucide-react";

import EventCard from "../features/events/components/EventCard";
import EventFormModal from "../features/events/components/EventFormModal";

import useEventsManagement from "../features/events/hooks/useEventsManagement";
import { useStaffContext } from "../features/staff/context/StaffContext";

import type { Event as LocalHostEvent } from "../types/event";

const EventsPage = () => {
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] =
    useState<LocalHostEvent | null>(null);

  const {
    eventList,
    eventAssignmentList,
    handleSaveEvent,
    handleDeleteEvent,
    getEventStaffIds,
  } = useEventsManagement();

  const {
    staffList,
    availabilityList,
  } = useStaffContext();

  const selectedEventStaffIds = selectedEvent
    ? getEventStaffIds(selectedEvent.id)
    : [];

  return (
    <div className="min-w-0 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
            Schedule
          </p>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-(--color-primary-soft) text-(--color-primary)">
              <CalendarDays
                size={19}
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-(--color-text) sm:text-3xl">
                Events
              </h1>

              <p className="mt-1 text-sm text-(--color-text-muted)">
                Plan events and manage staffing.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsAddEventOpen(true)}
          className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) sm:w-auto"
        >
          <Plus
            size={17}
            strokeWidth={2}
            aria-hidden="true"
          />

          Add Event
        </button>
      </div>

      {eventList.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-(--color-border) bg-(--color-surface) p-10 text-center">
          <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-(--color-primary-soft) text-(--color-primary)">
            <CalendarDays
              size={20}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </div>

          <p className="mt-4 text-sm font-semibold text-(--color-text)">
            No events yet
          </p>

          <p className="mt-1 text-sm text-(--color-text-muted)">
            Create an event to start planning staff and event details.
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
                  assignment.sourceType === "event" &&
                  assignment.sourceId === event.id,
              )}
              staffList={staffList}
              onEdit={setSelectedEvent}
              onDelete={handleDeleteEvent}
            />
          ))}
        </div>
      )}

      {isAddEventOpen && (
        <EventFormModal
          staffList={staffList}
          availabilityList={availabilityList}
          onClose={() => setIsAddEventOpen(false)}
          onSubmit={handleSaveEvent}
        />
      )}

      {selectedEvent && (
        <EventFormModal
          event={selectedEvent}
          staffList={staffList}
          availabilityList={availabilityList}
          initialStaffIds={selectedEventStaffIds}
          onClose={() => setSelectedEvent(null)}
          onSubmit={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default EventsPage;