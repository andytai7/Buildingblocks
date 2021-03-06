const Bcrypt = require("bcryptjs");
const router = require("express").Router();
const User = require("../models/users.model");
const Message = require("../models/messages.model");
const Chatroom = require("../models/chatrooms.model");
const Mongoose = require("mongoose");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(async (req, res) => {
  const salt = 10;
  const username = req.body.username;
  const password = await Bcrypt.hash(req.body.password, salt);
  const email = req.body.email;
  const avi = Number(req.body.avi);
  const chatrooms = req.body.chatrooms;
    const bio = req.body.bio;

    const newUser = new User({
        username,
        password,
        email,
        avi,
        chatrooms,
        bio
    });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/login").post(async (req, res) => {
  const obj = await User.findOne({ email: req.body.email });
  Bcrypt.compare(req.body.password, obj.password, function (err, result) {
    if (result) {
      console.log("logged in ");
      res.json(obj);
    } else {
      res.json("invalid password");
    }
  });
});

router.route("/update/:id").post((req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            user.username = req.body.username;
            user.password = req.body.password;
            user.email = req.body.email;
            user.avi = Number(req.body.avi);
            user.chatrooms = req.body.chatrooms;
            user.bio = req.body.bio;

            user
                .save()
                .then(() => res.json("User updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getuser/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user)) //then return as json ; else return error
    .catch((err) => res.status(400).json("Error: " + err));
});

// NEW: When a chatroom needs to be added for a user, a chatroom is
//      instantiated and added to the database. That chatroom is
//      then added to the users list of chatrooms

module.exports = router;
