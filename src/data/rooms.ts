import type { Room } from "../types/room";

export const rooms: Room[] = [
  {
    id: "room-blue",
    propertyId: "property-1",
    name: "Room Blue",
    capacity: 2,
    bedConfigurations: [
      {
        name: "Double setup",
        guestCapacity: 2,
        beds: [{ type: "king", quantity: 1 }],
      },
      {
        name: "Twin setup",
        guestCapacity: 2,
        beds: [{ type: "single", quantity: 2 }],
      },
    ],
    extraBeds: [],
  },

  {
    id: "room-orange",
    propertyId: "property-1",
    name: "Room Orange",
    capacity: 3,
    bedConfigurations: [
      {
        name: "Single guest",
        guestCapacity: 1,
        beds: [{ type: "king", quantity: 1 }],
      },
      {
        name: "Two guests",
        guestCapacity: 2,
        beds: [{ type: "king", quantity: 1 }],
      },
      {
        name: "Three guests",
        guestCapacity: 3,
        beds: [
          { type: "king", quantity: 1 },
          { type: "sofa", quantity: 1 },
        ],
      },
    ],
    extraBeds: [{ type: "baby", quantity: 1 }],
  },

  {
    id: "room-red",
    propertyId: "property-1",
    name: "Room Red",
    capacity: 4,
    bedConfigurations: [
      {
        name: "Single guest",
        guestCapacity: 1,
        beds: [{ type: "king", quantity: 1 }],
      },
      {
        name: "Two guests",
        guestCapacity: 2,
        beds: [{ type: "king", quantity: 1 }],
      },
      {
        name: "Three guests",
        guestCapacity: 3,
        beds: [
          { type: "king", quantity: 1 },
          { type: "sofa", quantity: 1 },
        ],
      },
      {
        name: "Four guests",
        guestCapacity: 4,
        beds: [
          { type: "king", quantity: 1 },
          { type: "sofa", quantity: 2 },
        ],
      },
    ],
    extraBeds: [{ type: "baby", quantity: 1 }],
  },
];