import React from "react";
import ChatRoomCard from "./ChatRoomCard";
function UserRoomsList({ rooms, toggleComponent, user, deleteRoom }) {
  return (
    <ul id="user-rooms-list">
      {rooms.map((room) => {
        if (user.user_id == room.user_id)
          return (
            <ChatRoomCard
              key={room.room_id}
              room={room}
              toggleComponent={toggleComponent}
              user={user}
              deleteRoom={deleteRoom}
              rooms={rooms}
            />
          );
      })}
    </ul>
  );
}
export default UserRoomsList;
