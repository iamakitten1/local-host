# LocalHost

LocalHost is a B&B operations management application built to simplify the daily work of small hospitality properties.

The project currently focuses on managing bookings, rooms, delegated cleaning, staff availability, work assignments, events, and operational schedules from one place.

The first version is being developed for real use in a single B&B property. After testing it during daily operations, the project can later be expanded to support multiple properties.

## Current Features

### Dashboard
- Today's arrivals and departures
- Room overview
- Pending cleaning overview
- Shared operational task data

### Rooms
- Create and edit rooms
- Room capacity management
- Flexible bed configurations
- Support for alternative bed setups

### Bookings
- Create and edit bookings
- Guest and stay information
- Room selection
- Guest count
- Check-in and check-out dates
- Estimated arrival time
- Booking status
- Bed setup per booking

### Cleaning
- Delegated room-cleaning tasks
- Task instructions
- Cleaner assignment
- Task status management
- Today, upcoming, and completed filters
- Shared task state with Staff and Dashboard

### Staff
- Team management
- Owner, Operations, and Staff roles
- Cleaning and Event work types
- Active/inactive staff status

### Availability
- Weekly staff availability
- Available, Unavailable, and Not Set states
- Optional availability time ranges
- Mobile day view
- Desktop weekly view

### Schedule
- Work tasks and events in one operational schedule
- Grouped by date
- Ordered by start time
- Staff assignment status
- Staffing warnings
- Cancellation review workflow

### Events
- Create, edit, and delete events
- Event date and time
- Area and instructions
- Required staff count
- Event staff assignments
- Staff availability checks
- Staffing status
- Event integration with the Staff Schedule

### Assignment Workflow
Staff assignments support:

- Pending
- Confirmed
- Declined
- Cancellation requested
- Cancelled

Staff can:

- Accept assignments
- Decline assignments with a reason
- Request cancellation of confirmed assignments

Owner / Operations can:

- Review cancellation requests
- Approve cancellations
- Reject cancellations

A temporary development preview is currently used to test staff-specific schedules until authentication is implemented.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- React Hook Form
- Zod

## Architecture

LocalHost follows a feature-first structure.

```text
src/
├── components/
├── config/
├── data/
├── features/
│   ├── assignments/
│   ├── bookings/
│   ├── cleaning/
│   ├── dashboard/
│   ├── events/
│   ├── rooms/
│   ├── staff/
│   └── tasks/
├── layouts/
├── pages/
└── types/

Current shared frontend state includes:

Work tasks
Work-task assignments
Events
Event assignments
Staff
Staff availability

This shared state is temporary frontend infrastructure. Once the backend is implemented, server-managed data will move to the API/database layer and TanStack Query will manage server state.

Development Status

LocalHost is currently in active development.

The frontend uses local mock data and React shared state. Data changes persist while navigating through the application but currently reset after a full browser refresh.

Roadmap
Frontend
 App shell and responsive navigation
 Dashboard
 Rooms management
 Bookings management
 Cleaning management
 Staff management
 Staff availability
 Shared operational schedule
 Events management
 Assignment confirmation workflow
 Cancellation request workflow
 Hours & Pay
 Cleaning time tracking
 Shopping list
 Role-based UI permissions
 Final validation and UX polish
Backend

Planned backend work includes:

Authentication
User sessions
Role-based authorization
PostgreSQL database
REST API
Persistent rooms and bookings
Persistent staff and availability
Persistent tasks and assignments
Persistent events
Work-session tracking
Payment records
Server-side validation
Production

The first production version will be tested in one real B&B property.

Future work may include:

Multi-property support
Property onboarding
Notifications
Improved reporting
Production monitoring
Deployment and custom domain
Getting Started

Clone the repository:

git clone https://github.com/iamakitten1/local-host.git

Enter the project:

cd local-host

Install dependencies:

npm install

Start the development server:

npm run dev

Create a production build:

npm run build
Project Goal

LocalHost is designed around real hospitality workflows rather than generic property-management features.

The goal is to create a practical operations tool that reduces manual coordination between bookings, cleaning, staff availability, assignments, events, and daily schedules.

The application is being developed incrementally and tested against real B&B workflows before broader expansion.
