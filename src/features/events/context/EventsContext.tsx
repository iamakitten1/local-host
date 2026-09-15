import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
  } from "react";
  
  import { events } from "../../../data/events";
  import { assignments } from "../../../data/assignments";
  
  import type { Event as LocalHostEvent } from "../../../types/event";
  import type { Assignment } from "../../../types/assignment";
  
  type EventsContextValue = {
    eventList: LocalHostEvent[];
    eventAssignmentList: Assignment[];
  
    setEventList: Dispatch<
      SetStateAction<LocalHostEvent[]>
    >;
  
    setEventAssignmentList: Dispatch<
      SetStateAction<Assignment[]>
    >;
  };
  
  const EventsContext =
    createContext<EventsContextValue | null>(null);
  
  type EventsProviderProps = {
    children: ReactNode;
  };
  
  export const EventsProvider = ({
    children,
  }: EventsProviderProps) => {
    const [eventList, setEventList] =
      useState<LocalHostEvent[]>(events);
  
    const [
      eventAssignmentList,
      setEventAssignmentList,
    ] = useState<Assignment[]>(
      assignments.filter(
        (assignment) =>
          assignment.sourceType === "event",
      ),
    );
  
    return (
      <EventsContext.Provider
        value={{
          eventList,
          eventAssignmentList,
          setEventList,
          setEventAssignmentList,
        }}
      >
        {children}
      </EventsContext.Provider>
    );
  };
  
  export const useEventsContext = () => {
    const context = useContext(EventsContext);
  
    if (!context) {
      throw new Error(
        "useEventsContext must be used inside EventsProvider",
      );
    }
  
    return context;
  };