import { useState } from "react";
import { Users } from "lucide-react";

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
import MySchedule from "../features/staff/components/my-schedule/MySchedule";

import AvailabilityTab from "../features/staff/components/availability/AvailabilityTab";

import WorkTaskFormModal from "../features/staff/components/work-task/TaskFormModal";

import EventFormModal from "../features/events/components/EventFormModal";

import useAssignmentActions from "../features/assignments/hooks/useAssignmentActions";

import HoursPayTab from "../features/hours-pay/components/HoursPayTab";
import { useHoursPayContext } from "../features/hours-pay/context/HoursPayContext";

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

  const [
    previewStaffId,
    setPreviewStaffId,
  ] = useState("");

  const selectedTaskStaffIds =
    selectedTask
      ? getTaskStaffIds(
          selectedTask.id,
        )
      : [];

  const selectedEventStaffIds =
    selectedEvent
      ? getEventStaffIds(
          selectedEvent.id,
        )
      : [];

  const previewStaff =
    staffList.filter(
      (member) =>
        member.isActive &&
        member.role !== "owner",
    );

  const {
    approveCancellation,
    rejectCancellation,
  } = useAssignmentActions();

  const {
    workSessionList,
  } = useHoursPayContext();

  return (
    <div className="min-w-0 space-y-6">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-muted)">
          Team operations
        </p>

        <div className="mt-2 flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-(--color-primary-soft) text-(--color-primary)">
            <Users
              size={19}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-(--color-text) sm:text-3xl">
              Staff
            </h1>

            <p className="mt-1 text-sm text-(--color-text-muted)">
              Manage team members,
              schedules, availability and
              working hours.
            </p>
          </div>
        </div>
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
          onEditStaff={
            setSelectedStaff
          }
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
          onEditTask={
            setSelectedTask
          }
          onDeleteTask={
            handleDeleteTask
          }
          onEditEvent={
            setSelectedEvent
          }
          onDeleteEvent={
            handleDeleteEvent
          }
          onApproveCancellation={
            approveCancellation
          }
          onRejectCancellation={
            rejectCancellation
          }
        />
      )}

      {activeTab ===
        "my-schedule" && (
        <div className="min-w-0">
          <div className="mb-6 rounded-2xl border border-(--color-border) bg-(--color-surface) p-4 shadow-sm sm:p-5">
            <label
              htmlFor="preview-staff"
              className="block text-sm font-semibold text-(--color-text)"
            >
              Development preview
            </label>

            <p className="mt-1 text-xs text-(--color-text-muted)">
              Choose a staff member to
              preview their schedule.
            </p>

            <select
              id="preview-staff"
              value={previewStaffId}
              onChange={(event) =>
                setPreviewStaffId(
                  event.target.value,
                )
              }
              className="mt-3 w-full rounded-xl border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary-muted) focus:ring-2 focus:ring-(--color-primary-soft) sm:max-w-sm"
            >
              <option value="">
                Select staff member
              </option>

              {previewStaff.map(
                (member) => (
                  <option
                    key={member.id}
                    value={member.id}
                  >
                    {
                      member.firstName
                    }{" "}
                    {member.lastName}
                  </option>
                ),
              )}
            </select>
          </div>

          {previewStaffId ? (
            <MySchedule
              staffId={
                previewStaffId
              }
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-(--color-border) bg-(--color-surface) p-8 text-center">
              <p className="text-sm font-semibold text-(--color-text)">
                Select a staff member
              </p>

              <p className="mt-1 text-sm text-(--color-text-muted)">
                Their assigned tasks and
                events will appear here.
              </p>
            </div>
          )}
        </div>
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
        <HoursPayTab
          staffList={staffList}
          workSessionList={
            workSessionList
          }
        />
      )}

      {isAddStaffOpen && (
        <StaffFormModal
          onClose={() =>
            setIsAddStaffOpen(false)
          }
          onSubmit={
            handleSaveStaff
          }
        />
      )}

      {selectedStaff && (
        <StaffFormModal
          member={selectedStaff}
          onClose={() =>
            setSelectedStaff(null)
          }
          onSubmit={
            handleSaveStaff
          }
        />
      )}

      {isAddTaskOpen && (
        <WorkTaskFormModal
          staffList={staffList}
          onClose={() =>
            setIsAddTaskOpen(false)
          }
          onSubmit={
            handleSaveTask
          }
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
          onSubmit={
            handleSaveTask
          }
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
          onSubmit={
            handleSaveEvent
          }
        />
      )}
    </div>
  );
};

export default StaffPage;