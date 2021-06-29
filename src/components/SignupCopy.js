import React from "react";
import './css/Signup.css';
import background from "../images/login_graphic.png"
import GoogleIcon from "../images/new-google-favicon-512.png"
import GoogleButton from "./GoogleButton.js"
import FacebookButton from "./FacebookButton.js"
import Navbar from "./Navbar.js"
import GoogleLogin from 'react-google-login'



const Signup = props => (
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

            <div className="rectangleRightSignUp"> 
                <div className="vertical-center">
                    < GoogleButton />
                </div>

                <div className="vertical-center">
                    <FacebookButton />
                </div>
                
                <div className = "customButton"> or </div>
                    
                <a href = "/signupWithEmail"><div className="customButton">Sign-up with E-mail</div></a>

                <div className="alreadyHaveAnAccount">
                    Already have an account?
                    <a href="./login"><span className="sign-in-button">Log In</span></a>
                </div>
            </div>
        </div>
    </div>
    
);

export default Signup;
