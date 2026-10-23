export type ShoppingPriority =
  | "normal"
  | "buy-soon"
  | "urgent";

export type SupplyItem = {
  id: string;
  propertyId: string;

  name: string;
  note?: string;
  photoUrl?: string;

  addedByStaffId: string;
  createdAt: string;
};

export type CartItem = {
  id: string;
  supplyId: string;

  quantity: number;
  priority: ShoppingPriority;

  addedAt: string;
};