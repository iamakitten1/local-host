import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App";

import { StaffProvider } from "./features/staff/context/StaffContext";
import { WorkTasksProvider } from "./features/tasks/context/WorkTasksContext";
import { EventsProvider } from "./features/events/context/EventsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StaffProvider>
      <WorkTasksProvider>
        <EventsProvider>
          <App />
        </EventsProvider>
      </WorkTasksProvider>
    </StaffProvider>
  </StrictMode>,
);