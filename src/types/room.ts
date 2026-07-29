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

export type Room = {
  id: string;
  propertyId: string;
  name: string;

  // რეკომენდებული capacityა, hard limit არა
  capacity: number;

  // ყველა საწოლი/ვარიანტი, რომელიც ამ ოთახში შეიძლება გამოიყენო
  availableBeds: Bed[];
};