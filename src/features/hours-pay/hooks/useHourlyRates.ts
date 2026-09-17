import { useHoursPayContext } from "../context/HoursPayContext";

import type { StaffHourlyRate } from "../../../types/staffHourlyRate";

type UpdateHourlyRateInput = {
  propertyId: string;
  staffId: string;
  hourlyRate: number;
  effectiveFrom: string;
};

const useHourlyRates = () => {
  const {
    hourlyRateList,
    setHourlyRateList,
  } = useHoursPayContext();

  const getCurrentHourlyRate = (
    staffId: string,
    date = new Date(),
  ) => {
    const dateKey = date
      .toISOString()
      .slice(0, 10);

    const rates = hourlyRateList
      .filter(
        (rate) =>
          rate.staffId === staffId &&
          rate.effectiveFrom <= dateKey,
      )
      .sort((a, b) =>
        b.effectiveFrom.localeCompare(
          a.effectiveFrom,
        ),
      );

    return rates[0] ?? null;
  };

  const getStaffRateHistory = (
    staffId: string,
  ) =>
    hourlyRateList
      .filter(
        (rate) =>
          rate.staffId === staffId,
      )
      .sort((a, b) =>
        b.effectiveFrom.localeCompare(
          a.effectiveFrom,
        ),
      );

  const updateHourlyRate = ({
    propertyId,
    staffId,
    hourlyRate,
    effectiveFrom,
  }: UpdateHourlyRateInput) => {
    if (
      !Number.isFinite(hourlyRate) ||
      hourlyRate <= 0
    ) {
      return {
        success: false,
        error:
          "Hourly rate must be greater than zero.",
      };
    }

    if (!effectiveFrom) {
      return {
        success: false,
        error:
          "Effective date is required.",
      };
    }

    const existingRate =
      hourlyRateList.find(
        (rate) =>
          rate.staffId === staffId &&
          rate.effectiveFrom ===
            effectiveFrom,
      );

    if (existingRate) {
      setHourlyRateList(
        (currentRates) =>
          currentRates.map(
            (rate) =>
              rate.id ===
              existingRate.id
                ? {
                    ...rate,
                    hourlyRate,
                  }
                : rate,
          ),
      );

      return {
        success: true,
        error: null,
      };
    }

    const newRate: StaffHourlyRate = {
      id: `hourly-rate-${Date.now()}`,
      propertyId,
      staffId,
      hourlyRate,
      effectiveFrom,
    };

    setHourlyRateList(
      (currentRates) => [
        ...currentRates,
        newRate,
      ],
    );

    return {
      success: true,
      error: null,
    };
  };

  return {
    hourlyRateList,
    getCurrentHourlyRate,
    getStaffRateHistory,
    updateHourlyRate,
  };
};

export default useHourlyRates;