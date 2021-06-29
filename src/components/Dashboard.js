//libraries
import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Component Imports
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import DashboardInfo from "./DashboardInfo";
import DashboardForm from "./DashboardForm";
import DashboardNavbar from "./DashboardNavbar";

//Style Imports
import "./css/Dashboard.css";

export default function Dashboard(props) {
  const loggedIn = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  const chatroomName = useSelector((state) => state.chatroomName);

  function logout() {
    dispatch({ type: "CHANGE_USERNAME", username: null });
    dispatch({ type: "CHANGE_EMAIL", email: null });
    dispatch({ type: "CHANGE_AVI", avi: null });
    dispatch({ type: "CHANGE_TYPE", myType: null });
    dispatch({ type: "CHANGE_CHATROOM", chatroom: false });
    dispatch({ type: "CHANGE_LASTUSER", lastUser: null });
    dispatch({ type: "CHANGE_LOGGEDIN", loggedIn: false });
    window.location.reload();
  }

  if (!loggedIn) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  } else if (!chatroomName) {
    return (
      <div className="dashboard">
        <DashboardNavbar logout={logout} />
        <Sidebar data={props} />
        <div className="cards-container">
          <DashboardInfo />
          <div className="cards-subcontainer">
            <DashboardForm />
            <DashboardForm />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: "/chatRoom",
        }}
      />
    );
  }
}
