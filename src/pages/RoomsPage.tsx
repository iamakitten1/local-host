import { useState } from "react";
import { rooms } from "../data/rooms";
import RoomCard from "../features/rooms/components/RoomCard";
import AddRoomModal from "../features/rooms/components/AddRoomModal";
import type { Bed, Room } from "../types/room";
import EditRoomModal from "../features/rooms/components/EditRoomModal";

const RoomsPage = () => {
  // მართავს, Add Room modal ღიაა თუ არა
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);

  // ამჟამად რომელი rooms ჩანს UI-ში
  const [roomList, setRoomList] = useState(rooms);

  // რომელი Room არის ახლა Edit რეჟიმში
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

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

  const handleDeleteRoom = (roomId: string) => {
    setRoomList((currentRooms) =>
      currentRooms.filter((room) => room.id !== roomId),
    );
  };

  const handleEditRoom = (room: Room) => {
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
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Rooms
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your rooms and available beds
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddRoomOpen(true)}
          className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
        >
          + Add Room
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
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
          onClose={() => setIsAddRoomOpen(false)}
          onAddRoom={handleAddRoom}
        />
      )}

      {editingRoom && (
        <EditRoomModal
          room={editingRoom}
          onClose={() => setEditingRoom(null)}
          onSave={handleSaveRoom}
        />
      )}
    </div>
  );
};

export default RoomsPage;