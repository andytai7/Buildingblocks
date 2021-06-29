//Libraries
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Style Imports
import "./css/ChatRoomLink.css";

// Icon Imports 
import academics from "../images/dashboardIcons/academics.png";
import substanceUse from "../images/dashboardIcons/substanceAbuse.png";
import Nutrition from "../images/dashboardIcons/nutrition.png";
import timeManagement from "../images/dashboardIcons/timeManagement.png";
import mentalHealth from "../images/dashboardIcons/mentalHealth.png";

export default function ChatRoomLink(props) {
  const iconArr = [
    academics,
    timeManagement,
    substanceUse,
    mentalHealth,
    Nutrition,
  ];

  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const chatroom = useSelector((state) => state.chatroom);

  useEffect(() => {
    console.log(clicked);
  });
  function joinChat() {
    dispatch({
      type: "CHANGE_CHATROOMNAME",
      chatroomName: props.chatroom.name,
    });
    dispatch({ type: "CHANGE_CHATROOMID", chatroomId: props.chatroom.id });
    // localStorage.setItem("chatRoom", props.roomName);
    window.location.reload();
  }

  function handleClick() {
    setClicked(!clicked);
  }

  // { console.log(props) }
  if (!clicked) {
    return (
      <div className="chat-room-link" onClick={handleClick}>
        <button className="chat-join-button" onClick={joinChat}>
          <img src={iconArr[props.chatroom.icon]} alt="icon" />
        </button>
        <div
          className={
            props.sidebarState ? "chat-room-name active" : "chat-room-name"
          }
        >
          {props.chatroom.name}
        </div>
      </div>
    );
  } else {
    let chatRoomUsers = props.chatroom.users.map((user, i) => {
      if (i !== 2) {
        return (
          <div key={i} className="chat-room-link-user">
            {user.name}
          </div>
        );
      } else {
        return (
          <div className="chat-room-link-user">
            {user.name} +{props.chatroom.users.length - 3} others
          </div>
        );
      }
    });
    if (chatRoomUsers.length === 0 && props.sidebarState) {
      return (
        <div className="chat-room-link-clicked" onClick={handleClick}>
          {/* {console.log(props.roomName)} */}
          <button className="chat-join-button">
            <img src={iconArr[props.chatroom.icon]} alt="icon" />
          </button>
          {props.chatroom.name}
          <br />
          <div className="chat-users-panel">
            <div className="chat-room-link-user-none">No active users</div>
          </div>
        </div>
      );
    } else if (chatRoomUsers.length === 0 && !props.sideBarState) {
      setClicked(!clicked);
    } else if (chatRoomUsers.length < 3) {
      return (
        <div className="chat-room-link-clicked" onClick={handleClick}>
          {props.chatroom.name}
          <button className="chat-join-button">JOIN</button>
          <br />
          <div className="chat-users-panel">{chatRoomUsers}</div>
        </div>
      );
    } else if (chatroom === props.roomName) {
      return (
        <div className="chat-room-link-clicked" onClick={handleClick}>
          {props.chatroom.name}
          <button className="chat-join-button">DISCONNECT</button>
          <br />
          <div className="chat-users-panel">{chatRoomUsers[0]}</div>
          <div className="chat-users-panel">{chatRoomUsers[1]}</div>
          <div className="chat-users-panel">{chatRoomUsers[2]}</div>
        </div>
      );
    } else {
      return (
        <div className="chat-room-link-clicked" onClick={handleClick}>
          {props.chatroom.name}
          <button className="chat-join-button">JOIN</button>
          <br />
          <div className="chat-users-panel">{chatRoomUsers[0]}</div>
          <div className="chat-users-panel">{chatRoomUsers[1]}</div>
          <div className="chat-users-panel">{chatRoomUsers[2]}</div>
        </div>
      );
    }
  }
}
