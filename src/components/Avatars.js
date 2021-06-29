import React, { Component } from "react";
import "./css/Avatars.css";
import axios from "axios";

class Avatars extends Component {
  constructor(props) {
    super();
    this.state = {
      avis: [],
    };
    this.onAvatarClick = this.onAvatarClick.bind(this);
  }

  componentWillMount() {
    for (let i = 1; i < 60; i++) {
      this.state.avis.push(i.toString());
    }
  }

  onAvatarClick(e, index) {
    e.preventDefault();
    console.log(localStorage.getItem("_id"));
    axios
      .get("http://localhost:5000/users/getuser/" + localStorage.getItem("_id"))
      .then((res) => {
        const newUsername = res.data.username;
        const newPassword = res.data.password;
        const newEmail = res.data.email;
        const newAvi = this.state.avis[index];
        const newBio = res.data.bio;
        const user = {
          username: newUsername,
          password: newPassword,
          email: newEmail,
          avi: newAvi,
          bio: newBio,
        };
        localStorage.setItem("avi", user.avi);
        axios
          .post(
            "http://localhost:5000/users/update/" + localStorage.getItem("_id"),
            user
          )
          .then((res) => {
            console.log(res.data);
            window.location.reload();
          });
      });
  }

  render() {
    return (
      <div className="avatars">
        <p className="chooseAvatar">Choose a new avatar</p>
        {this.state.avis.map((avi, i) => (
          <img
            height="15%"
            width="15%"
            src={require("../images/icons/" + avi + ".png")}
            className="avatarImage"
            onClick={(e) => this.onAvatarClick(e, i)}
            alt="avatar"
          />
        ))}
      </div>
    );
  }
}
export default Avatars;
