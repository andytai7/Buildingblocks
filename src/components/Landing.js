import React, { useState } from "react";

import header from "../images/header.svg";
import { Redirect, Link } from "react-router-dom";
import { useSelector } from "react-redux";

//Style imports
import "./css/Landing.css";

// Image imports
import logo from "../images/bblogo.png";
import phoneWebLanding from "../images/phoneWebLanding.svg";
import phoneModel from "../images/phoneModel.svg";
import choosegroup from "../images/choosegroup.png";
import talkstudents from "../images/talkstudents.png";
import laptop from "../images/laptop.png";
import check from "../images/check.png";
import mentor from "../images/mentor.png";
import plant from "../images/plant.svg";
import background from "../images/landingpagebg.png";

// Component imports
import Card from "./Card";
import Navbar from "./Navbar";
import Footer from "./Footer";
import InfoCard from "./InfoCard.js";
import SubText from "./SubText";

//Icon imports
import assignmentIcon from "../images/icons/assignment.svg";
import chatBubble from "../images/icons/chatBubble.svg";
import checkedAssignment from "../images/icons/checkedAssignment.svg";
import gadget from "../images/icons/gadget.svg";
import tools from "../images/icons/tools.svg";
import handshake from "../images/icons/handshake.svg";

export default function Landing() {
  const profile = useSelector((state) => state.profile);

  function logout(e) {
    console.log("Test");
    localStorage.setItem("loggedIn", "false");
    this.setState(this.state);
  }

  const loggedIn = useSelector((state) => state.loggedIn);
  if (!loggedIn) {
    return (
      <>
        <div className="landingHeader">
          <h1>Building Blocks</h1>
          <p>A peer-mentoring app created for students, by students</p>
          <div className="buttonContainer">
            <button className="demoButton">REQUEST A DEMO</button>
            <button className="getStartedButton">GET STARTED</button>
          </div>
          <img src={phoneWebLanding} className="phoneWebLanding" />
        </div>
        <div className="homeContent">
          <h1> How It Works</h1>
          <p>
            Building Blocks is a <b>free</b> webapp to help students transition
            from highschool to university through online peer mentoring.
            Building Blocks is being developed by students, for students to
            improve student life and wellbeing.
          </p>
          <div className="homeContainer">
            <div className="homeContainer-left">
              <img src={phoneModel} className="homeContainer-phoneModel" />
            </div>
            <div className="homeContainer-right">
              <Card
                title="Apply to be a Mentor"
                image={assignmentIcon}
                body="Fill out an application to become a mentor. Your application will be reviewed and you’ll recieve an email in your inbox."
              />

              <Card
                title="Match With a Peer"
                image={checkedAssignment}
                body="After taking a short survey, the matching algorithm matches mentors and mentees together to ensure a good fit."
              />

              <Card
                title="Start Connecting"
                image={chatBubble}
                body="Use the private messaging to chat with your mentor or mentees or create chatrooms to connect with other students!"
              />
            </div>
          </div>

          <div className="bottomContainer">
            <h1> Building Blocks for Student Clubs</h1>
            <p>
              Building Blocks can help student clubs run their peer mentoring
              programs seamlessly. We are currently in beta testing. If you
              would like to get involved or if your student club would like to
              beta test the web app, <a>contact us</a>!
            </p>

            <div className="bottomCardContainer">
              <Card
                title="One Platform to Manage it All"
                image={gadget}
                body="Building Blocks organizes everything in one place. Club execs can view all their mentees’ and mentor’s information and easily send them messages."
              />
              <Card
                title="Help Mentors Build Skills"
                image={tools}
                body="Mentor Skills Modules help mentors learn soft skills they can apply when mentoring. From how to support others with empathy to how to  give advice, we ensure mentors have the tools they need to be successful."
              />
              <Card
                title="The Matching Algorithm"
                image={checkedAssignment}
                body="Ensure mentors and mentees are paired up successfully! The peer matching algorithm takes all the work out of assigning mentors and mentees."
              />
              <Card
                title="Check on Mentors' Progress"
                image={handshake}
                body="Improve the mentorship experience through goal setting, check in, and reflection exercises throughout the academic term."
              />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: "/dashboard",
          state: profile,
        }}
      />
    );
  }
}
