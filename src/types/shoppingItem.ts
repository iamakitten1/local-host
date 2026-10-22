export type ShoppingItemPriority =
  | "normal"
  | "buy-soon"
  | "urgent";

export type ShoppingItem = {
  id: string;
  propertyId: string;

  name: string;
  priority: ShoppingItemPriority;

  note?: string;
  photoUrl?: string;

  addedByStaffId: string;
  createdAt: string;

  isBought: boolean;
};