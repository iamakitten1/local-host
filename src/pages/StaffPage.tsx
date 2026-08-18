import { useState } from "react";

import { staff } from "../data/staff";
import { workTasks } from "../data/workTasks";
import { staffAvailability } from "../data/staffAvailability";

import type {
  Staff,
  StaffAvailability,
} from "../types/staff";
import type { WorkTask } from "../types/workTask";

import StaffFormModal from "../features/staff/components/team/StaffFormModal";
import TeamTab from "../features/staff/components/team/TeamTab";

import ScheduleTab from "../features/staff/components/schedule/ScheduleTab";

import WorkTaskFormModal from "../features/staff/components/work-task/TaskFormModal";

import StaffTabs, {
  type StaffTab,
} from "../features/staff/components/StaffTabs";

import AvailabilityTab from "../features/staff/components/availability/AvailabilityTab";

const StaffPage = () => {
  const [activeTab, setActiveTab] =
    useState<StaffTab>("team");

  const [staffList, setStaffList] =
    useState<Staff[]>(staff);

  const [
    isAddStaffOpen,
    setIsAddStaffOpen,
  ] = useState(false);

  const [
    selectedStaff,
    setSelectedStaff,
  ] = useState<Staff | null>(null);

  const [taskList, setTaskList] =
    useState<WorkTask[]>(workTasks);

  const [
    isAddTaskOpen,
    setIsAddTaskOpen,
  ] = useState(false);

  const [
    selectedTask,
    setSelectedTask,
  ] = useState<WorkTask | null>(null);

  const [
    availabilityList,
    setAvailabilityList,
  ] = useState<StaffAvailability[]>(
    staffAvailability,
  );

  const handleSaveStaff = (
    member: Staff,
  ) => {
    setStaffList(
      (currentStaff) => {
        const staffExists =
          currentStaff.some(
            (currentMember) =>
              currentMember.id ===
              member.id,
          );

        if (staffExists) {
          return currentStaff.map(
            (currentMember) =>
              currentMember.id ===
              member.id
                ? member
                : currentMember,
          );
        }

        return [
          ...currentStaff,
          member,
        ];
      },
    );
  };

  const handleSaveTask = (
    task: WorkTask,
  ) => {
    setTaskList(
      (currentTasks) => {
        const taskExists =
          currentTasks.some(
            (currentTask) =>
              currentTask.id ===
              task.id,
          );

        if (taskExists) {
          return currentTasks.map(
            (currentTask) =>
              currentTask.id ===
              task.id
                ? task
                : currentTask,
          );
        }

        return [
          ...currentTasks,
          task,
        ];
      },
    );
  };

  const handleDeleteTask = (
    taskId: string,
  ) => {
    const shouldDelete =
      window.confirm(
        "Delete this task?",
      );

    if (!shouldDelete) {
      return;
    }

    setTaskList(
      (currentTasks) =>
        currentTasks.filter(
          (task) =>
            task.id !== taskId,
        ),
    );
  };

  const handleSaveAvailability = (
    availability: StaffAvailability,
  ) => {
    setAvailabilityList(
      (currentAvailability) => {
        const availabilityExists =
          currentAvailability.some(
            (currentEntry) =>
              currentEntry.id ===
              availability.id,
          );

        if (availabilityExists) {
          return currentAvailability.map(
            (currentEntry) =>
              currentEntry.id ===
              availability.id
                ? availability
                : currentEntry,
          );
        }

        return [
          ...currentAvailability,
          availability,
        ];
      },
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Staff
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage team members, schedules, and working hours
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
          onEditStaff={
            setSelectedStaff
          }
        />
      )}

      {activeTab ===
        "schedule" && (
        <ScheduleTab
          taskList={taskList}
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

      {activeTab ===
        "hours" && (
        <p className="text-sm text-gray-500">
          Working hours and payroll
          summary will go here.
        </p>
      )}

      {isAddStaffOpen && (
        <StaffFormModal
          onClose={() =>
            setIsAddStaffOpen(
              false,
            )
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
            setIsAddTaskOpen(
              false,
            )
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
          onClose={() =>
            setSelectedTask(null)
          }
          onSubmit={
            handleSaveTask
          }
        />
      )}
    </div>
  );
};

export default StaffPage;