import React, { Component } from "react";
import SidebarChat from "./SidebarChat";
import { Redirect } from "react-router-dom";
import DashboardHeaderChat from "./DashboardHeaderChat";
import Chat from "./Chat";
import "./css/ChatRoom.css";
import TextContainer from "./TextContainer";
import { useSelector, useDispatch } from "react-redux";

import Sidebar from "./Sidebar";

export default function OuterChatContainer(props) {
  const username = useSelector((state) => state.username);
  const email = useSelector((state) => state.email);
  const avi = useSelector((state) => state.avi);
  const chatroomName = useSelector((state) => state.chatroomName);
  const chatroomId = useSelector((state) => state.chatroomId);
  const dispatch = useDispatch();

  function logout(e) {
    dispatch({ type: "CHANGE_LOGGEDIN", loggedIn: false });
    dispatch({ type: "CHANGE_CHATROOMNAME", chatroomNAME: "" });
    dispatch({ type: "CHANGE_CHATROOMID", chatroomId: "" });
    window.location.reload();
  }

  return !chatroomName ? (
    <Redirect
      to={{
        pathname: "/dashboard",
      }}
    />
  ) : (
    <div className="outoutContainer">
      <DashboardHeaderChat />
      <Sidebar />
      <div className="outerContainer">
        <br />
        <Chat
          className="chatRoom"
          theName={username}
          theRoomName={chatroomName}
          theRoomId={chatroomId}
          theEmail={email}
          theAvi={avi}
        />
      </div>
    </div>
  );
}
