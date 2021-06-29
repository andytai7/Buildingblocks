import React, { useState } from "react";
import "./css/SignupWithEmail.css";
import "./css/Signup.css";
import background from "../images/login_graphic.png"
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import Navbar from "./Navbar.js"

export default function SignupWithEmai() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avi, setAvi] = useState("01");
  const [bio, setBio] = useState("");
  const loggedIn = useSelector((state) => state.loggedIn);

  function onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: username,
      password: password,
      email: email,
      avi: avi,
      bio: bio,
    };
    console.log(newUser);
    console.log(newUser.password);

    setUsername("");
    setPassword("");
    setEmail("");
    setAvi("01");
    setBio("");
    axios.post("http://localhost:5000/users/add", newUser).then((res) => {
      if (res.data === "User added!") {
        console.log(res.data);
      } else {
        // useAlert("Sorry, can you please try again?");
        console.log(res.data);
      }
    });
  }
  return !loggedIn ? (
    <div>
      <div className="signUp">
      
        <div className="rectangleSignUp">
          <a href="/" className="App-name-login">
            ⬅ STUDENT CONVERSATIONS NOW
          </a>
          <div className="niceToMeetYou">
            Welcome to<br></br>Building Blocks
          </div>

          <img className="signupPicture" src={background}/>

        </div>
        <div className="rectangleRight">
          <form onSubmit={onSubmit}>
            <div className="nickInput">
              <label>Name</label> <br/>
              <input
                className="nickInputForm"
                type="text"
                
                name="Nickname"
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            
            <div className="emailInput">
              <label>Email</label>
              <input
                className="emailInputForm"
                type="email"
                
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            
            <div className="passwordInput">
              <label>Password</label>
              <input
                className="passInputForm"
                type="password"
                
                name="passcode"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="confirmPasswordInput">
              <label>Confirm Password</label>
              <input
                className="confirmPassInputForm"
                type="password"
                
                name="passcode"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>

            <div className="mentorMenteeText">
              I want to be a
            </div>

            <div className="mentorMenteeButtons">
              <div className="mentorButton">
                MENTOR
              </div>
              <div className="menteeButton">
                MENTEE
              </div>
            </div>
            
            
            <input type="submit" className="signupButton" value="Continue" />
          </form>

          <div className="alreadyHaveAnAccount">
            Already have an account?{" "}
            <a href="./login">
              <span className="sign-in-button">Log In</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect
      to={{
        pathname: "/dashboard",
      }}
    />
  );
}
