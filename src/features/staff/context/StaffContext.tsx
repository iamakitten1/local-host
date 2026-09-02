import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
  } from "react";
  
  import { staff } from "../../../data/staff";
  import { staffAvailability } from "../../../data/staffAvailability";
  
  import type {
    Staff,
    StaffAvailability,
  } from "../../../types/staff";
  
  type StaffContextValue = {
    staffList: Staff[];
    availabilityList: StaffAvailability[];
  
    setStaffList: Dispatch<
      SetStateAction<Staff[]>
    >;
  
    setAvailabilityList: Dispatch<
      SetStateAction<StaffAvailability[]>
    >;
  };
  
  const StaffContext =
    createContext<StaffContextValue | null>(
      null,
    );
  
  type StaffProviderProps = {
    children: ReactNode;
  };
  
  export const StaffProvider = ({
    children,
  }: StaffProviderProps) => {
    const [staffList, setStaffList] =
      useState<Staff[]>(staff);
  
    const [
      availabilityList,
      setAvailabilityList,
    ] = useState<StaffAvailability[]>(
      staffAvailability,
    );
  
    return (
      <StaffContext.Provider
        value={{
          staffList,
          availabilityList,
          setStaffList,
          setAvailabilityList,
        }}
      >
        {children}
      </StaffContext.Provider>
    );
  };
  
  export const useStaffContext = () => {
    const context = useContext(StaffContext);
  
    if (!context) {
      throw new Error(
        "useStaffContext must be used inside StaffProvider",
      );
    }
  
    return context;
  };