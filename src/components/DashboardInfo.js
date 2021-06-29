//Libraries
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

//Component Imports
import Avatars from "./Avatars";

//Style Imports
import "./css/DashBoardInfo.css";
import edit from "../images/edit.png";
import { Popup } from "semantic-ui-react";

export default function DashboardInfo() {
    const [editProfile, setEditProfile] = useState(false);
    const avi = useSelector(state => state.avi);
    const username = useSelector(state => state.username);
    const email = useSelector(state => state.email);
    const bio = useSelector(state => state.bio);

    function _chooseAvi(){
        document.body.style.overflow = 'hidden';
    };

    function _editProfile(){
        this.setState({
            editProfile: true,
        });
    };

  return !editProfile ? (
    <div className="dashboard-info">
      <div className="info-header">
        <img
          alt="User Avatar"
          src={require("../images/icons/" + avi + ".png")}
        />
        <div className="username-email">
          <text>{username}</text>
          <text className="email">{email}</text>
        </div>
      </div>
      <div className="info-bio">
        <text>
          {/*bio*/}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit rhoncus
          nulla etiam aliquet fermentum elit, purus. Turpis eu eget egestas
          accumsan.
        </text>
      </div>
      <div className="edit-profile">
        <button type="button" onClick={_editProfile}>
          Edit Profile
        </button>
      </div>
    </div>
  ) : (
    <Redirect
      to={{
        pathname: "/editProfile",
      }}
    />
  );
}

//Popup needs to be worked on
{
  /* <Popup
        content={<Avatars />}
        on="click"
        pinned
        className="popup"
        trigger={
          <button className="edit-avi">
            <img
              alt="Edit Avatar"
              width="15px"
              height="15px"
              src={require("../images/editavi.png")}
              onClick={_chooseAvi}
            />
          </button>
        }
      /> 
      */
}
