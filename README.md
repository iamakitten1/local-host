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