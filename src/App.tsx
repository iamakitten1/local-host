import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import DashboardPage from "./pages/DashboardPage";
import RoomsPage from "./pages/RoomsPage";
import BookingsPage from "./pages/BookingsPage";
import CleaningPage from "./pages/CleaningPage";
import EventsPage from "./pages/EventsPage";
import StaffPage from "./pages/StaffPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route
            index
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/rooms"
            element={<RoomsPage />}
          />

          <Route
            path="/bookings"
            element={<BookingsPage />}
          />

          <Route
            path="/cleaning"
            element={<CleaningPage />}
          />

          <Route
            path="/events"
            element={<EventsPage />}
          />

          <Route
            path="/staff"
            element={<StaffPage />}
          />

          <Route
            path="/shopping-list"
            element={<ShoppingListPage />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;