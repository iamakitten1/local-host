import type { Room } from "../types/room";

export const rooms: Room[] = [
  {
    id: "room-blue",
    propertyId: "property-1",
    name: "Room Blue",
    capacity: 2,
    availableBeds: [
      { type: "king", quantity: 1 },
      { type: "single", quantity: 2 },
    ],
  },

  {
    id: "room-orange",
    propertyId: "property-1",
    name: "Room Orange",
    capacity: 3,
    availableBeds: [
      { type: "king", quantity: 1 },
      { type: "sofa", quantity: 1 },
      { type: "single", quantity: 1 },
      { type: "baby", quantity: 1 },
    ],
  },

  {
    id: "room-red",
    propertyId: "property-1",
    name: "Room Red",
    capacity: 4,
    availableBeds: [
      { type: "king", quantity: 1 },
      { type: "sofa", quantity: 2 },
      { type: "single", quantity: 1 },
      { type: "baby", quantity: 1 },
    ],
  },
];