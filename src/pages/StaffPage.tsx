import { useState } from "react";
import { staff } from "../data/staff";
import StaffCard from "../features/staff/components/StaffCard";
import type { Staff } from "../types/staff";
import StaffFormModal from "../features/staff/components/StaffFormModal";
import { workTasks } from "../data/workTasks";
import ScheduleTaskCard from "../features/staff/components/ScheduleTaskCard";
import type { WorkTask } from "../types/workTask";
import WorkTaskFormModal from "../features/staff/components/work-task/TaskFormModal";


type StaffTab = "team" | "schedule" | "hours";

const StaffPage = () => {
  const [activeTab, setActiveTab] = useState<StaffTab>("team");
  const [staffList, setStaffList] = useState<Staff[]>(staff);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [taskList, setTaskList] = useState(workTasks);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<WorkTask | null>(null);

  const handleSaveStaff = (member: Staff) => {
    setStaffList((currentStaff) => {
      const staffExists = currentStaff.some(
        (currentMember) => currentMember.id === member.id,
      );

      if (staffExists) {
        return currentStaff.map((currentMember) =>
          currentMember.id === member.id ? member : currentMember,
        );
      }

      return [...currentStaff, member];
    });
  };

  const handleSaveTask = (task: WorkTask) => {
    setTaskList((currentTasks) => {
      const taskExists = currentTasks.some(
        (currentTask) => currentTask.id === task.id,
      );

      if (taskExists) {
        return currentTasks.map((currentTask) =>
          currentTask.id === task.id ? task : currentTask,
        );
      }

      return [...currentTasks, task];
    });
  };

  const handleDeleteTask = (taskId: string) => {
    const shouldDelete = window.confirm("Delete this task?");

    if (!shouldDelete) {
      return;
    }

    setTaskList((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  };

  const tasksByDate = taskList.reduce<Record<string, typeof taskList>>(
    (groups, task) => {
      if (!groups[task.date]) {
        groups[task.date] = [];
      }

      groups[task.date].push(task);

      return groups;
    },
    {},
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Staff</h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage team members, schedules, and working hours
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("team")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            activeTab === "team"
              ? "bg-gray-900 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Team
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("schedule")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            activeTab === "schedule"
              ? "bg-gray-900 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Schedule
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("hours")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            activeTab === "hours"
              ? "bg-gray-900 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Hours & Pay
        </button>
      </div>

      {/* Team */}
      {activeTab === "team" && (
        <div>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Team members: {staffList.length}
            </p>

            <button
              type="button"
              onClick={() => setIsAddStaffOpen(true)}
              className="w-full cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto"
            >
              + Add Staff
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {staffList.map((member) => (
              <StaffCard
                key={member.id}
                member={member}
                onEdit={setSelectedStaff}
              />
            ))}
          </div>
        </div>
      )}

      {/* Schedule */}
      {activeTab === "schedule" && (
        <div>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Schedule</h2>

              <p className="mt-1 text-sm text-gray-500">
                Staff tasks and daily assignments
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddTaskOpen(true)}
              className="w-full cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto"
            >
              + Add Task
            </button>
          </div>

          <div className="space-y-8">
            {Object.entries(tasksByDate).map(([date, tasks]) => (
              <section key={date}>
                <h3 className="mb-3 text-sm font-semibold text-gray-700">
                  {date}
                </h3>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {tasks
                    .sort((a, b) =>
                      (a.startTime ?? "").localeCompare(b.startTime ?? ""),
                    )
                    .map((task) => (
                      <ScheduleTaskCard
                        key={task.id}
                        task={task}
                        staffList={staffList}
                        onEdit={setSelectedTask}
                        onDelete={handleDeleteTask}
                      />
                    ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}

      {/* Hours & Pay */}
      {activeTab === "hours" && (
        <p className="text-sm text-gray-500">
          Working hours and payroll summary will go here.
        </p>
      )}

      {isAddStaffOpen && (
        <StaffFormModal
          onClose={() => setIsAddStaffOpen(false)}
          onSubmit={handleSaveStaff}
        />
      )}

      {isAddTaskOpen && (
        <WorkTaskFormModal
          staffList={staffList}
          onClose={() => setIsAddTaskOpen(false)}
          onSubmit={handleSaveTask}
        />
      )}

      {selectedTask && (
        <WorkTaskFormModal
          task={selectedTask}
          staffList={staffList}
          onClose={() => setSelectedTask(null)}
          onSubmit={handleSaveTask}
        />
      )}

      {selectedStaff && (
        <StaffFormModal
          member={selectedStaff}
          onClose={() => setSelectedStaff(null)}
          onSubmit={handleSaveStaff}
        />
      )}
    </div>
  );
};

export default StaffPage;
