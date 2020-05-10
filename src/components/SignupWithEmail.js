
import React, { Component } from "react";
import './css/SignupWithEmail.css';
import axios from 'axios';

export default class SignupWithEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            userType: 'mentee',
            email: '',
            xp: 0,
            studentid: ''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeStudentid = this.onChangeStudentid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password,
            userType: this.state.userType,
            email: this.state.email,
            xp: this.state.xp,
            studentid: this.state.studentid
        }
        this.setState({
            username: '',
            password: '',
            userType: 'mentee',
            email: '',
            xp: 0,
            studentid: ''
        });
        axios.post('http://sconversationsnow.herokuapp.com/users/add', newUser)
            .then(res => console.log(res.data));
        
            
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeStudentid(e) {
        this.setState({
            studentid: e.target.value
        });
    }

    render() {
        return (
            <div className="signUp">
                <div className="rectangleSignUp">
                    <a href="/" className="App-name-login">⬅ STUDENT CONVERSATIONS NOW</a>
                    <div className="niceToMeetYou">Nice to<br></br>Meet You</div>
                </div>
                <div className="rectangleRight">

                    <form onSubmit={this.onSubmit}>
                        <div className="nickInput">

                            <input type="text" placeholder="Nickname" name="Nickname" required onChange={this.onChangeUsername} value={this.state.username}/>

                        </div>
                        <div className="nickLine" />

                        <div className="emailInput">

                            <input type="email" placeholder="Email" name="email" required onChange={this.onChangeEmail} value={this.state.email}/>

                        </div>

                        <div className="emailLine" />
                        <div className="passwordInput">

                            <input type="password" placeholder="Password" name="passcode" required onChange={this.onChangePassword} value={this.state.password}/>

                        </div>
                        <div className="passwordLine" />

                        <div className="studentIdInput">

                            <input type="text" pattern="\d+" placeholder="Student ID" name="StudentID" required onChange={this.onChangeStudentid} value={this.state.studentid}/>

                        </div>
                        <div className="studentIdLine" />
                        <input type="submit" className="signupButton" value="Sign up" />

                    </form>

                    <div className="alreadyHaveAnAccount">
                        Already have an account? <a href="./login"><span className="sign-in-button">Log In</span></a>
                    </div>
                </div>


            </div>
        );
    }
}