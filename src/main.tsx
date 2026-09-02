import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App.tsx'
import { WorkTasksProvider } from "./features/tasks/context/WorkTasksContext";
import { StaffProvider } from "./features/staff/context/StaffContext";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StaffProvider>
      <WorkTasksProvider>
        <App />
      </WorkTasksProvider>
    </StaffProvider>
  </StrictMode>,
);
