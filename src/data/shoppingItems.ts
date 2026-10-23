import type {
  CartItem,
  SupplyItem,
} from "../types/shoppingItem";

export const supplies: SupplyItem[] = [
  {
    id: "supply-1",
    propertyId: "property-1",
    name: "Toilet paper",
    note: "3-ply preferred",
    addedByStaffId: "staff-2",
    createdAt: "2026-10-22T09:30:00",
  },
  {
    id: "supply-2",
    propertyId: "property-1",
    name: "Coffee capsules",
    note: "Lavazza compatible",
    addedByStaffId: "staff-1",
    createdAt: "2026-10-22T10:15:00",
  },
  {
    id: "supply-3",
    propertyId: "property-1",
    name: "Trash bags",
    note: "Large black bags",
    addedByStaffId: "staff-3",
    createdAt: "2026-10-22T11:00:00",
  },
  {
    id: "supply-4",
    propertyId: "property-1",
    name: "Hand soap",
    addedByStaffId: "staff-1",
    createdAt: "2026-10-22T12:00:00",
  },
  {
    id: "supply-5",
    propertyId: "property-1",
    name: "Dishwasher tablets",
    addedByStaffId: "staff-1",
    createdAt: "2026-10-22T13:00:00",
  },
];

export const cartItems: CartItem[] = [
  {
    id: "cart-1",
    supplyId: "supply-1",
    quantity: 2,
    priority: "urgent",
    addedAt: "2026-10-23T09:00:00",
  },
  {
    id: "cart-2",
    supplyId: "supply-2",
    quantity: 1,
    priority: "buy-soon",
    addedAt: "2026-10-23T09:10:00",
  },
];