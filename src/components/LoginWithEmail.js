import React, { useState } from "react";
import "./css/Login.css";
import axios from "axios";

import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import Cookies from 'universal-cookie';


import login_graphic from "../images/login_graphic.svg";
import login_mobile from "../images/login_mobile.svg";

export default function LoginWithEmail() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const isLoggedIn = useSelector((state) => state.loggedIn);
  axios.defaults.withCredentials = true;
  const cookies = new Cookies();
  const instance = axios.create({
    withCredentials: true
  })

  function onSubmit(e) {
    e.preventDefault();
    const userCredentials = {
      email: email,
      password: password
    };
    setEmail("");
    setPassword("");


    instance
      .post("http://localhost:5000/users/login", userCredentials, { withCredentials: true })
      .then((res) => {
        if (res.data === "invalid password") {
          // useAlert("Sorry can you please check your credentials and try again?");
          console.log(res);
        } else {
          console.log(res.data.token);
          dispatch({
            type: "CHANGE_USER_ALL",
            user: {
              loggedIn: true,
              username: res.data.user.username,
              email: res.data.user.email,
              _id: res.data.user._id,
              bio: res.data.user.bio,
              avi: res.data.user.avi,
            },
          });
          dispatch({
            type: "CHANGE_TOKEN",
            token: res.data.token,
          })
          // cookies.set('token', res.data.token, { path: '/' });
          // localStorage.setItem("token", res.data.token);
          setLoggedIn(true);
          setProfile(res.data);
        }
      });
  }
  return !isLoggedIn ? (



      <div className="login-content">




      <div className="welcome-back">
        <div className="welcome-back-content">
        <p className="welcome-text">Welcome Back
        </p>
          <picture style={{Width: "60%", alignItems: "center"}}>
            <source style={{width: "100%"}} media="(min-width: 950px)" srcSet={login_graphic}/>
            <img style={{width: "100%"}} src={login_mobile} alt="Logo"/>
          </picture>
      </div>
      </div>

      <div className="login-wrapper">
        <div className="login-container">


        <form  onSubmit={onSubmit}>
          <div className="email-input-form">
            <div className="email-input-field">
              <label>Email</label>
              <input
                className="email-input-box"
                type="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

            </div>

            <div className="email-input-field">
              <label>Password</label>
              <input
                className="email-input-box"
                type="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

            </div>
            <span to="/login" className="forgot-password">Forgot your password ?</span>
            <input type="submit" className="login-button" value="Log in" />
          </div>
        </form>
        <div className="no-account">
          Don't have an account?{" "}
          <a href="./signup">
            <Link to="/signup" className="sign-up-button">Sign Up</Link>
          </a>
        </div>
        </div>
      </div>
      </div>
  ) : (
    <Redirect
      to={{
        pathname: "/dashboard",
        state: profile,
      }}
    />
  );
}

