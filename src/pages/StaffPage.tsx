import { useState } from "react";

import useStaffDirectory from "../features/staff/hooks/useStaffDirectory";
import useStaffAvailability from "../features/staff/hooks/useStaffAvailability";
import useStaffTasks from "../features/staff/hooks/useStaffTasks";
import useEventsManagement from "../features/events/hooks/useEventsManagement";

import type { Staff } from "../types/staff";
import type { WorkTask } from "../types/workTask";
import type { Event as LocalHostEvent } from "../types/event";

import StaffTabs, {
  type StaffTab,
} from "../features/staff/components/StaffTabs";

import TeamTab from "../features/staff/components/team/TeamTab";
import StaffFormModal from "../features/staff/components/team/StaffFormModal";

import ScheduleTab from "../features/staff/components/schedule/ScheduleTab";

import AvailabilityTab from "../features/staff/components/availability/AvailabilityTab";

import WorkTaskFormModal from "../features/staff/components/work-task/TaskFormModal";

import EventFormModal from "../features/events/components/EventFormModal";

const StaffPage = () => {
  const [activeTab, setActiveTab] =
    useState<StaffTab>("team");

  const {
    staffList,
    handleSaveStaff,
  } = useStaffDirectory();

  const {
    availabilityList,
    handleSaveAvailability,
  } = useStaffAvailability();

  const {
    taskList,
    assignmentList,
    handleSaveTask,
    handleDeleteTask,
    getTaskStaffIds,
  } = useStaffTasks();

  const {
    eventList,
    eventAssignmentList,
    handleSaveEvent,
    handleDeleteEvent,
    getEventStaffIds,
  } = useEventsManagement();

  const [
    isAddStaffOpen,
    setIsAddStaffOpen,
  ] = useState(false);

  const [
    selectedStaff,
    setSelectedStaff,
  ] = useState<Staff | null>(null);

  const [
    isAddTaskOpen,
    setIsAddTaskOpen,
  ] = useState(false);

  const [
    selectedTask,
    setSelectedTask,
  ] = useState<WorkTask | null>(null);

  const [
    selectedEvent,
    setSelectedEvent,
  ] = useState<LocalHostEvent | null>(
    null,
  );

  const selectedTaskStaffIds =
    selectedTask
      ? getTaskStaffIds(selectedTask.id)
      : [];

  const selectedEventStaffIds =
    selectedEvent
      ? getEventStaffIds(selectedEvent.id)
      : [];

  return (
    <div className="min-w-0">
      <div className="mb-6 min-w-0">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Staff
        </h1>

        <p className="mt-1 wrap-break-word text-sm text-gray-500">
          Manage team members, schedules,
          and working hours
        </p>
      </div>

      <StaffTabs
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "team" && (
        <TeamTab
          staffList={staffList}
          onAddStaff={() =>
            setIsAddStaffOpen(true)
          }
          onEditStaff={setSelectedStaff}
        />
      )}

      {activeTab === "schedule" && (
        <ScheduleTab
          taskList={taskList}
          assignmentList={
            assignmentList
          }
          eventList={eventList}
          eventAssignmentList={
            eventAssignmentList
          }
          staffList={staffList}
          availabilityList={
            availabilityList
          }
          onAddTask={() =>
            setIsAddTaskOpen(true)
          }
          onEditTask={setSelectedTask}
          onDeleteTask={
            handleDeleteTask
          }
          onEditEvent={
            setSelectedEvent
          }
          onDeleteEvent={
            handleDeleteEvent
          }
        />
      )}

      {activeTab ===
        "availability" && (
        <AvailabilityTab
          staffList={staffList}
          availabilityList={
            availabilityList
          }
          onSaveAvailability={
            handleSaveAvailability
          }
        />
      )}

      {activeTab === "hours" && (
        <p className="wrap-break-word text-sm text-gray-500">
          Working hours and payroll
          summary will go here.
        </p>
      )}

      {isAddStaffOpen && (
        <StaffFormModal
          onClose={() =>
            setIsAddStaffOpen(false)
          }
          onSubmit={handleSaveStaff}
        />
      )}

      {selectedStaff && (
        <StaffFormModal
          member={selectedStaff}
          onClose={() =>
            setSelectedStaff(null)
          }
          onSubmit={handleSaveStaff}
        />
      )}

      {isAddTaskOpen && (
        <WorkTaskFormModal
          staffList={staffList}
          onClose={() =>
            setIsAddTaskOpen(false)
          }
          onSubmit={handleSaveTask}
        />
      )}

      {selectedTask && (
        <WorkTaskFormModal
          task={selectedTask}
          staffList={staffList}
          initialStaffIds={
            selectedTaskStaffIds
          }
          onClose={() =>
            setSelectedTask(null)
          }
          onSubmit={handleSaveTask}
        />
      )}

      {selectedEvent && (
        <EventFormModal
          event={selectedEvent}
          staffList={staffList}
          availabilityList={
            availabilityList
          }
          initialStaffIds={
            selectedEventStaffIds
          }
          onClose={() =>
            setSelectedEvent(null)
          }
          onSubmit={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default StaffPage;