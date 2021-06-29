import React, { Component } from "react";
import "./css/Dashboard.css";
import logo from "../images/minlogo.png";
import { useDispatch, useSelector } from "react-redux";

export default function DashboardHeaderEdit(props) {
  const dispatch = useDispatch();
  const avi = useSelector((state) => state.avi);

  function logout() {
    dispatch({ type: "CHANGE_LOGGEDIN", loggedIn: false });
    dispatch({ type: "CHANGE_CHATROOMNAME", chatroomName: "" });
    dispatch({ type: "CHANGE_LASTUSER", lastUser: null });
    window.location.reload();
  }

  return (
    <div className="dashboard-header-edit">
      <img src={logo} className="minlogo" />
      <img
        alt="User Avatar"
        className="header-avi"
        src={require("../images/icons/" + avi + ".png")}
      />
      <button className="logoutDashboard" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
