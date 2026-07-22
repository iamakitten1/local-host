export type BedType =
  | "single"
  | "double"
  | "queen"
  | "king"
  | "sofa"
  | "bunk"
  | "baby";

export type Bed = {
  type: BedType;
  quantity: number;
};

export type BedConfiguration = {
  id: string;
  name: string;
  guestCapacity: number;
  beds: Bed[];
};

export type Room = {
  id: string;
  propertyId: string;
  name: string;
  capacity: number;
  bedConfigurations: BedConfiguration[];
  extraBeds: Bed[];
};