import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { workTasks } from "../../../data/workTasks";
import { assignments } from "../../../data/assignments";

import type { WorkTask, WorkTaskStatus } from "../../../types/workTask";

import type { Assignment } from "../../../types/assignment";

type WorkTasksContextValue = {
  taskList: WorkTask[];
  assignmentList: Assignment[];

  setTaskList: Dispatch<SetStateAction<WorkTask[]>>;

  setAssignmentList: Dispatch<
    SetStateAction<Assignment[]>
  >;

  handleStatusChange: (
    taskId: string,
    status: WorkTaskStatus,
  ) => void;
};

const WorkTasksContext = createContext<WorkTasksContextValue | null>(null);

type WorkTasksProviderProps = {
  children: ReactNode;
};

export const WorkTasksProvider = ({ children }: WorkTasksProviderProps) => {
  const [taskList, setTaskList] = useState<WorkTask[]>(workTasks);

  const [assignmentList, setAssignmentList] = useState<Assignment[]>(
    assignments.filter((assignment) => assignment.sourceType === "work-task"),
  );

  const handleStatusChange = (taskId: string, status: WorkTaskStatus) => {
    setTaskList((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status,
            }
          : task,
      ),
    );
  };

  return (
    <WorkTasksContext.Provider
      value={{
        taskList,
        assignmentList,
        setTaskList,
        setAssignmentList,
        handleStatusChange,
      }}
    >
      {children}
    </WorkTasksContext.Provider>
  );
};

export const useWorkTasksContext = () => {
  const context = useContext(WorkTasksContext);

  if (!context) {
    throw new Error(
      "useWorkTasksContext must be used inside WorkTasksProvider",
    );
  }

  return context;
};
