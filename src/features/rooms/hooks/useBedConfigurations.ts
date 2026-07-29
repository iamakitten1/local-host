import { useState } from "react";
import type { BedConfiguration, BedType } from "../../../types/room";

const useBedConfigurations = () => {
  const [bedConfigurations, setBedConfigurations] =
    useState<BedConfiguration[]>([]);

  // ახალი bed configuration
  const handleAddConfiguration = () => {
    const newConfiguration: BedConfiguration = {
      id: `config-${Date.now()}`,
      name: "New configuration",
      guestCapacity: 1,
      beds: [],
    };

    setBedConfigurations((currentConfigurations) => [
      ...currentConfigurations,
      newConfiguration,
    ]);
  };

  // Configuration name-ის შეცვლა
  const handleConfigurationNameChange = (
    configurationId: string,
    name: string,
  ) => {
    setBedConfigurations((currentConfigurations) =>
      currentConfigurations.map((configuration) =>
        configuration.id === configurationId
          ? {
            ...configuration,
            name,
          }
          : configuration,
      ),
    );
  };

  // Configuration guest capacity-ის შეცვლა
  const handleGuestCapacityChange = (
    configurationId: string,
    guestCapacity: number,
  ) => {
    setBedConfigurations((currentConfigurations) =>
      currentConfigurations.map((configuration) =>
        configuration.id === configurationId
          ? {
            ...configuration,
            guestCapacity,
          }
          : configuration,
      ),
    );
  };

  // კონკრეტულ configuration-ში ახალი bed
  const handleAddBed = (configurationId: string) => {
    setBedConfigurations((currentConfigurations) =>
      currentConfigurations.map((configuration) =>
        configuration.id === configurationId
          ? {
            ...configuration,
            beds: [
              ...configuration.beds,
              {
                type: "single",
                quantity: 1,
              },
            ],
          }
          : configuration,
      ),
    );
  };

  // კონკრეტული bed-ის type-ის შეცვლა
  const handleBedTypeChange = (
    configurationId: string,
    bedIndex: number,
    type: BedType,
  ) => {
    setBedConfigurations((currentConfigurations) =>
      currentConfigurations.map((configuration) =>
        configuration.id === configurationId
          ? {
            ...configuration,
            beds: configuration.beds.map((bed, index) =>
              index === bedIndex
                ? {
                  ...bed,
                  type,
                }
                : bed,
            ),
          }
          : configuration,
      ),
    );
  };

  // კონკრეტული bed-ის quantity-ის შეცვლა
  const handleBedQuantityChange = (
    configurationId: string,
    bedIndex: number,
    quantity: number,
  ) => {
    setBedConfigurations((currentConfigurations) =>
      currentConfigurations.map((configuration) =>
        configuration.id === configurationId
          ? {
            ...configuration,
            beds: configuration.beds.map((bed, index) =>
              index === bedIndex
                ? {
                  ...bed,
                  quantity,
                }
                : bed,
            ),
          }
          : configuration,
      ),
    );
  };
  const handleDeleteBed = (
    configurationId: string,
    bedIndex: number,
  ) => {
    setBedConfigurations((currentConfigurations) =>
      currentConfigurations.map((configuration) =>
        configuration.id === configurationId
          ? {
            ...configuration,
            beds: configuration.beds.filter(
              (_, index) => index !== bedIndex,
            ),
          }
          : configuration,
      ),
    );
  };

  // მთელი configuration-ის წაშლა
  const handleDeleteConfiguration = (configurationId: string) => {
    setBedConfigurations((currentConfigurations) =>
      currentConfigurations.filter(
        (configuration) => configuration.id !== configurationId,
      ),
    );
  };

  return {
    bedConfigurations,
    handleAddConfiguration,
    handleConfigurationNameChange,
    handleGuestCapacityChange,
    handleAddBed,
    handleBedTypeChange,
    handleBedQuantityChange,
    handleDeleteBed,
    handleDeleteConfiguration,
  };
};

export default useBedConfigurations;