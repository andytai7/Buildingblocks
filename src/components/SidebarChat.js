import React, { useState, useEffect } from "react";
import "./css/Sidebar.css";
import ChatRoomLink from "./ChatRoomLink";
import io from "socket.io-client";

class ChatRoom {
  constructor(name, id) {
    this.name = name;
    this.users = [];
    this.id = id;
  }
}

let socket;

const SideBarChat = (props) => {
  const academics = new ChatRoom("Academics", "6010cc15332c6903dccd6420");
  const timeManagement = new ChatRoom(
    "Time Management",
    "6010cce4332c6903dccd6421"
  );
  const mentalHealth = new ChatRoom(
    "Mental Health",
    "6010ccf2332c6903dccd6422"
  );
  const substanceUse = new ChatRoom(
    "Substance Use",
    "6010cd00332c6903dccd6423"
  );
  const nutrition = new ChatRoom("Nutrition", "6010cd13332c6903dccd6424");
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

    // chatRooms.forEach((chat) => {
    //   socket.emit("getRoom", chat.name);
    // })
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("roomDataGlobal", ({ room, newUsers }) => {
      // {console.log("these are the new " + room + " users: ")}
      // {console.log(newUsers)};
      let rooms = [...chatRooms];
      const elementIndex = chatRooms.findIndex(
        (element) => element.name.trim().toLowerCase() == room
      );
      // {console.log(elementIndex)};
      if (elementIndex > -1) {
        rooms[elementIndex] = { ...rooms[elementIndex], users: newUsers };
        setChatRooms(rooms);
      }
    });
  }, [chatRooms]);

  useEffect(() => {
    socket.on("allRooms", (rooms) => {
      // {console.log(rooms)}
      const theRooms = [...chatRooms];
      for (let i = 0; i < theRooms.length; i++) {
        theRooms[i] = { ...theRooms[i], users: rooms[i] };
      }
      setChatRooms(theRooms);
    });
  }, [chatRooms]);

  let chatRoomsComponents = [];
  if (typeof chatRooms !== "undefined" && chatRooms !== null) {
    chatRoomsComponents = chatRooms.map((room, i) => (
      <ChatRoomLink chatroom={room} key={i} />
    ));
  }

  return (
    <div className="sidebar-body">
      <p className="sidebar-title">Chat Rooms</p>
      <div className="chat-room-panel">{chatRoomsComponents}</div>
    </div>
  );
};

export default SideBarChat;
