import React, { useEffect, useState } from "react";
import MainPageNav from "./MainPageNav";
import UserRoomsList from "./UserRoomsList";
import ChatRoomList from "./ChatRoomList";
import SearchBar from "./SearchBar";
import Chat from "./Chat";
import NewChatRoomForm from "./NewChatRoomForm";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
function MainPage() {
  const url = "http://127.0.0.1:5555";
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user); // Initialize user state as null
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState();
  const [search, setSearch] = useState("");
  const [showComponent, setShowComponent] = useState(false);
  const [chatForm, showChatForm] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  // Fetch all chat rooms on component mount
  useEffect(() => {
    fetch(`${url}/chat_rooms`)
      .then((res) => res.json())
      .then((chatRooms) => {
        setRooms(chatRooms);
        console.log("Chat Rooms:", chatRooms);
      })
      .catch((error) => console.error("Error fetching chat rooms:", error));
  }, []);
  useEffect(() => {
    if (user) {
      fetch(`${url}/users/${user.user_id}`)
        .then((res) => res.json())
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  // Welcome message for the user, lasts 5 seconds
  useEffect(() => {
    const welcomeMessageTimer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 5000);

    return () => {
      clearTimeout(welcomeMessageTimer);
    };
  }, []);

  // Function that toggles a room if clicked on
  const toggleComponent = (room) => {
    setSelectedRoom({ ...room });
    setShowComponent(true);
    console.log(room);
  };

  // State that allows the chat rooms to be searched
  const filtered = rooms.filter((room) =>
    room.room_name.toUpperCase().includes(search.toUpperCase())
  );

  // Search state
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  // Function that toggles new chat room form
  function handleFormClick() {
    showChatForm((prev) => !prev);
  }

  // Function that allows for the deletion of a chat room
  function deleteRoom(id) {
    const room = filtered.filter((room) => room.room_id !== id);
    setRooms(room);
  }

  return (
    <div id="mainPage-container">
      <MainPageNav user={user} />
      <div id="search-container">
        <SearchBar search={search} updateSearch={updateSearch} />
        <button
          onClick={handleFormClick}
          className="button-circle"
          id="toggleFormButton"
        >
          +
        </button>
      </div>
      {chatForm && (
        <NewChatRoomForm
          rooms={rooms}
          chatForm={chatForm}
          setRooms={setRooms}
          user={user}
        />
      )}
      {user && showWelcomeMessage && (
        <div id="welcomeMessage-container">
          <p className="welcomeMessage">Welcome {user.username}</p>
        </div>
      )}
      <div id="both-lists-container">
        <div id="user-rooms-list-container">
          <div id="my-chat-rooms-message-container">
            <h1>
              My Rooms{" "}
              <FontAwesomeIcon style={{ color: "dodgerblue" }} icon={faLock} />
            </h1>
          </div>
          <UserRoomsList
            toggleComponent={toggleComponent}
            rooms={filtered}
            user={user}
            deleteRoom={deleteRoom}
          />
        </div>

        <div id="public-rooms-list-container">
          <div id="public-chat-rooms-message-container">
            <h1>
              Public Chat Rooms{" "}
              <FontAwesomeIcon
                style={{ color: "dodgerblue" }}
                className="fa-globe"
                icon={faGlobe}
              />
            </h1>
          </div>
          <ChatRoomList
            toggleComponent={toggleComponent}
            rooms={filtered}
            user={user}
            deleteRoom={deleteRoom}
          />
        </div>
      </div>
      {showComponent && (
        <Chat
          key={selectedRoom.room_id}
          room={selectedRoom}
          user={user}
          url={url}
        />
      )}
    </div>
  );
}

export default MainPage;
