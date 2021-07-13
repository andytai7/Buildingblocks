//libraries
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Component Imports
import Sidebar from "./Sidebar";
import DashboardInfo from "./DashboardInfo";
import DashboardForm from "./DashboardForm";

//Style Imports
import "./css/Dashboard.css";

export default function Dashboard(props) {
  const loggedIn = useSelector((state) => state.loggedIn);
  const chatroomName = useSelector((state) => state.chatroomName);



  if (!loggedIn) {
    return (
      <Redirect
        to={{
          pathname: "/loginWithEmail",
        }}
      />
    );
  } else if (!chatroomName) {
    return (
        <div className="dashboard-wrapper">


      <div className="dashboard">
        <div className="cards-container">
          <DashboardInfo />
          <div className="cards-subcontainer">
            <DashboardForm />
            <DashboardForm />
          </div>
        </div>
      </div>
        <Sidebar data={props} />
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
