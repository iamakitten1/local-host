import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App.tsx'
import { WorkTasksProvider } from "./features/tasks/context/WorkTasksContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WorkTasksProvider>
      <App />
    </WorkTasksProvider>
  </StrictMode>,
);
