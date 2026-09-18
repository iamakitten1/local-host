/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { staffHourlyRates } from "../../../data/staffHourlyRates";

import type { WorkSession } from "../../../types/workSession";
import type { StaffHourlyRate } from "../../../types/staffHourlyRate";
import type { PaymentRecord } from "../../../types/payment";

type HoursPayContextValue = {
  workSessionList: WorkSession[];
  hourlyRateList: StaffHourlyRate[];
  paymentList: PaymentRecord[];

  setWorkSessionList: Dispatch<
    SetStateAction<WorkSession[]>
  >;

  setHourlyRateList: Dispatch<
    SetStateAction<StaffHourlyRate[]>
  >;

  setPaymentList: Dispatch<
    SetStateAction<PaymentRecord[]>
  >;
};

const HoursPayContext =
  createContext<HoursPayContextValue | null>(
    null,
  );

type HoursPayProviderProps = {
  children: ReactNode;
};

export const HoursPayProvider = ({
  children,
}: HoursPayProviderProps) => {
  const [
    workSessionList,
    setWorkSessionList,
  ] = useState<WorkSession[]>([]);

  const [
    hourlyRateList,
    setHourlyRateList,
  ] = useState<StaffHourlyRate[]>(
    staffHourlyRates,
  );

  const [
    paymentList,
    setPaymentList,
  ] = useState<PaymentRecord[]>([]);

  return (
    <HoursPayContext.Provider
      value={{
        workSessionList,
        hourlyRateList,
        paymentList,
        setWorkSessionList,
        setHourlyRateList,
        setPaymentList,
      }}
    >
      {children}
    </HoursPayContext.Provider>
  );
};

export const useHoursPayContext = () => {
  const context =
    useContext(HoursPayContext);

  if (!context) {
    throw new Error(
      "useHoursPayContext must be used inside HoursPayProvider",
    );
  }

  return context;
};