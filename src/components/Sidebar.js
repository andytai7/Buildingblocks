//libraries
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

//Component Imports
import ChatRoomLink from "./ChatRoomLink";

//Style Imports
import "./css/Sidebar.css";

//Icon Imports
import toggleSidebar from "../images/dashboardIcons/Subtract.png";
import togSidebar from "../images/dashboardIcons/greySubtract.jpg";
import messages from "../images/dashboardIcons/messages.png";

class ChatRoom {
  constructor(name, id, icon) {
    this.name = name;
    this.users = [];
    this.id = id;
    this.icon = icon;
  }
}

let socket;

export default function SideBar(props) {
  const academics = new ChatRoom("Academics", "6010cc15332c6903dccd6420", 0);
  const timeManagement = new ChatRoom(
    "Time Management",
    "6010cce4332c6903dccd6421",
    1
  );
  const mentalHealth = new ChatRoom(
    "Mental Health",
    "6010ccf2332c6903dccd6422",
    2
  );
  const substanceUse = new ChatRoom(
    "Substance Use",
    "6010cd00332c6903dccd6423",
    3
  );
  const nutrition = new ChatRoom("Nutrition", "6010cd13332c6903dccd6424", 4);

  const [chatRooms, setChatRooms] = useState([
    academics,
    timeManagement,
    mentalHealth,
    substanceUse,
    nutrition,
  ]);

  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("getRooms", [...chatRooms]);
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("roomDataGlobal", ({ room, newUsers }) => {
      {
        console.log("these are the new " + room + " users: ");
      }
      {
        console.log(newUsers);
      }
      let rooms = [...chatRooms];
      const elementIndex = chatRooms.findIndex(
        (element) => element.name.trim().toLowerCase() == room
      );
      {
        console.log(elementIndex);
      }
      if (elementIndex > -1) {
        rooms[elementIndex] = { ...rooms[elementIndex], users: newUsers };
        setChatRooms(rooms);
      }
    });
  }, [chatRooms]);

  useEffect(() => {
    socket.on("allRooms", (rooms) => {
      {
        console.log(rooms);
      }
      const theRooms = [...chatRooms];
      for (let i = 0; i < theRooms.length; i++) {
        theRooms[i] = { ...theRooms[i], users: rooms[i] };
      }
      setChatRooms(theRooms);
    });
  }, [chatRooms]);

  const [sidebar, setSidebar] = useState(false);

  let chatRoomsComponents = [];
  if (typeof chatRooms !== "undefined" && chatRooms !== null) {
    chatRoomsComponents = chatRooms.map((room, i) => (
      <ChatRoomLink chatroom={room} key={i} sidebarState={sidebar} />
    ));
  }

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div
      onClick={showSidebar}
      className={sidebar ? "sidebar-body active" : "sidebar-body"}
    >
      <div
        className={sidebar ? "chat-room-panel active" : "chat-room-panel"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={sidebar ? "sidebar-title active" : "sidebar-title"}>
          Chatrooms
          <button>
            <img src={messages} alt="text" />
          </button>
        </div>
        {chatRoomsComponents}
      </div>
      <div
        onClick={showSidebar}
        className={sidebar ? "toggle-container active" : "toggle-container"}
      >
        <Link to="#">
          {sidebar ? (
            <img src={togSidebar} alt="toggle sidebar" />
          ) : (
            <img src={toggleSidebar} alt="toggle sidebar" />
          )}
          {sidebar ? <text>Toggle Sidebar</text> : <text></text>}
        </Link>
      </div>
    </div>
  );
}
