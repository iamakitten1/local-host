import { useState } from "react";
import {
  BedDouble,
  Plus,
} from "lucide-react";

import { rooms } from "../data/rooms";

import RoomCard from "../features/rooms/components/RoomCard";
import AddRoomModal from "../features/rooms/components/AddRoomModal";
import EditRoomModal from "../features/rooms/components/EditRoomModal";

import type { Bed, Room } from "../types/room";

const RoomsPage = () => {
  const [isAddRoomOpen, setIsAddRoomOpen] =
    useState(false);

  const [roomList, setRoomList] =
    useState(rooms);

  const [editingRoom, setEditingRoom] =
    useState<Room | null>(null);

  const handleAddRoom = (
    name: string,
    capacity: number,
    availableBeds: Bed[],
  ) => {
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      propertyId: "property-1",
      name,
      capacity,
      availableBeds,
    };

    setRoomList((currentRooms) => [
      ...currentRooms,
      newRoom,
    ]);
  };

  const handleDeleteRoom = (
    roomId: string,
  ) => {
    setRoomList((currentRooms) =>
      currentRooms.filter(
        (room) => room.id !== roomId,
      ),
    );
  };

  const handleEditRoom = (
    room: Room,
  ) => {
    setEditingRoom(room);
  };

  const handleSaveRoom = (
    roomId: string,
    name: string,
    capacity: number,
  ) => {
    setRoomList((currentRooms) =>
      currentRooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              name,
              capacity,
            }
          : room,
      ),
    );
  };

  return (
    <div className="min-w-0">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-widest text-[#5b7e72]">
            Property
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Rooms
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage rooms, capacity and bed configurations.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsAddRoomOpen(true)
          }
          className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#3f6f60] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#345f52] sm:w-auto"
        >
          <Plus
            size={17}
            strokeWidth={2}
            aria-hidden="true"
          />

          Add Room
        </button>
      </div>

      <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#e7e5df] bg-white px-4 py-3 shadow-sm">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#edf3ef] text-[#3f6f60]">
          <BedDouble
            size={18}
            strokeWidth={1.9}
            aria-hidden="true"
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-900">
            {roomList.length}{" "}
            {roomList.length === 1
              ? "room"
              : "rooms"}
          </p>

          <p className="text-xs text-gray-500">
            Current property configuration
          </p>
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roomList.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onDelete={handleDeleteRoom}
            onEdit={handleEditRoom}
          />
        ))}
      </div>

      {isAddRoomOpen && (
        <AddRoomModal
          onClose={() =>
            setIsAddRoomOpen(false)
          }
          onAddRoom={handleAddRoom}
        />
      )}

      {editingRoom && (
        <EditRoomModal
          room={editingRoom}
          onClose={() =>
            setEditingRoom(null)
          }
          onSave={handleSaveRoom}
        />
      )}
    </div>
  );
};

export default RoomsPage;