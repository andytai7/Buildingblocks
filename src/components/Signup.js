import React from "react";
import './css/Signup.css';
import background from "../images/login_graphic.png"
import GoogleIcon from "../images/new-google-favicon-512.png"
import GoogleButton from "./GoogleButton.js"
import FacebookButton from "./FacebookButton.js"
import Navbar from "./Navbar.js"
import GoogleLogin from 'react-google-login'



const Signup = props => (
    <div className="main">
        <Navbar />
        <section id="leftSide">
            <div className="welcomeText"> Welcome to<br/>Building Blocks </div>
            <img className="signupImg" src={background}/>
        </section>

        <section id="rightSide">
          
            <div className="vertical-center">
                < GoogleButton />
            </div>

            <div className="vertical-center">
                < FacebookButton />
            </div>

            <div className="customButton orText">Or</div>

            <a href = "/signupWithEmail"><div className="customButton">Sign-up with E-mail</div></a>

            <div className="alreadyHaveAnAccountText">
                Already have an account?
                <a href="./login"><span className="sign-in-button"> Log In</span></a>
            </div>
        </section>
    </div>
    
);

export default Signup;
