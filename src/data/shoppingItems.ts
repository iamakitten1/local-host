import type { ShoppingItem } from "../types/shoppingItem";

export const shoppingItems: ShoppingItem[] = [
  {
    id: "shopping-1",
    propertyId: "property-1",
    name: "Toilet paper",
    priority: "urgent",
    note: "Only one pack left",
    addedByStaffId: "staff-2",
    createdAt: "2026-10-22T09:30:00",
    isBought: false,
  },
  {
    id: "shopping-2",
    propertyId: "property-1",
    name: "Coffee capsules",
    priority: "buy-soon",
    addedByStaffId: "staff-1",
    createdAt: "2026-10-22T10:15:00",
    isBought: false,
  },
  {
    id: "shopping-3",
    propertyId: "property-1",
    name: "Trash bags",
    priority: "normal",
    addedByStaffId: "staff-3",
    createdAt: "2026-10-22T11:00:00",
    isBought: false,
  },
];