import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import './css/Signup.css';
import GoogleIcon from "../images/new-google-favicon-512.png"
export class GoogleButton extends Component {
    responseSuccessGoogle=(response)=>{
        console.log(response);
        console.log(response.profileObj);
        axios({
            method: "POST",
            url: "http://localhost:5000/users/login",
            data: {tokenId: response.tokenId}
        }).then(response => {
            console.log(response);
        })
    }
    responseErrorGoogle=(response)=>{
        console.log(response);
        console.log(response.profileObj);
    }
    render() {
        return (
            <div>
                <GoogleLogin 
                clientId="617015858222-1ddpao4ifrsv6i6e9430ljrjfe9mnfe0.apps.googleusercontent.com"
                render={(renderProps) => (
                    <button className="customGoogleButton" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      Sign-up with Google
                      <img className="buttonIcons" src={GoogleIcon} />
                    </button>
                  )}
                buttonText="Signup with Google"
                onSuccess={this.responseSuccessGoogle}
                onFailure={this.responseErrorGoogle}
                cookiePolicy={'single_host_origin'}
                />
            </div>
        )
    }
}

export default GoogleButton
