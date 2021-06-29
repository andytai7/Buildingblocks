import React, { Component } from 'react'

import './css/Signup.css';
import FacebookIcon from "../images/facebook_circle-512Fb.png"
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

export class FacebookButton extends Component {
    responseFacebook=(response)=>{
        console.log(response);
    }
    render() {
        return (
            <div>
                <FacebookLogin
                appId="530654214739999"
                render={(renderProps) => (
                    <button className="customGoogleButton" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      Sign-up with Facebook
                      <img className="buttonIcons" src={FacebookIcon} />
                    </button>
                  )}
                autoLoad={true}
                fields="name,email,picture"
                //onClick={componentClicked}
                callback={this.responseFacebook} />
            </div>
        )
    }
}

export default FacebookButton
