import React, { useState } from "react";
import "./css/Login.css";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import facebook from "../images/facebook_circle-512Fb.png"
import google from "../images/new-google-favicon-512.png"
import login_graphic from "../images/login_graphic.svg"
import login_mobile from "../images/login_mobile.svg"

export default function LoginWithSocial() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [profile, setProfile] = useState({});
    const isLoggedIn = useSelector((state) => state.loggedIn);



  function onSubmit(e) {
    e.preventDefault();
    const userCredentials = {
      email: email,
      password: password,
    };
    setEmail("");
    setPassword("");

    axios
      .post("http://localhost:5000/users/login", userCredentials)
      .then((res) => {
        if (res.data === "invalid password") {
          // useAlert("Sorry can you please check your credentials and try again?");
          console.log(res);
        } else {
          dispatch({
            type: "CHANGE_USER_ALL",
            user: {
              loggedIn: true,
              username: res.data.username,
              email: res.data.email,
              _id: res.data._id,
              bio: res.data.bio,
              avi: res.data.avi,
            },
          });
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
            <picture style={{width: "60%", alignItems: "center"}}>
                <source style={{width: "100%"}} media="(min-width: 950px)" srcSet={login_graphic}/>
                <img style={{width: "100%"}} src={login_mobile} alt="Logo"/>
            </picture>
      </div>
      </div>
      
      <div className="login-wrapper">
        <div className="login-container">
            <div className="social-login-form">

                <div className="social-login-option">
                    <p> Log in with Google </p>
                    <img src={google} alt="google"></img>
                </div>

                <div className="social-login-option">
                    <p> Log in with Facebook </p>
                    <img src={facebook} alt="facebook"></img>
                </div>

                <div className="blank-or">
                    <p style={{fontWeight: "400", textAlign: "left"}}> or </p>
                </div>

                <div className="social-login-option">
                    <Link style={{textDecoration: "none", color: "black"}} to="login-email"> Log in with e-mail </Link>
                </div>

            </div>

            <div className="no-account">
                Don't have an account?{" "}
                <a href="./signup" style={{textDecoration: "none"}}>
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
