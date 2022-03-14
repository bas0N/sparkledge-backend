const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fspromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required." });
  }

  const foundUser = usersDB.users.find((person) => person.email == email);
  if (!foundUser) return res.sendStatus(401); //Unauthorised
  const comparison = bcrypt.compare(password, foundUser.password);
  if (comparison) {
    const accessToken = jwt.sign(
      {
        email: foundUser.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "45s" }
    );
    const refreshToken = jwt.sign(
      {
        email: foundUser.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //take care of it
    otherUsers = usersDB.users.filter(
      (person) => person.email != foundUser.email
    );
    currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    //write the user to the file
    console.log(currentUser);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); //one day valid cookie
    res.json({ accessToken });
  } else {
    res.sendStatus(401); //Unautorised
  }
};

module.exports = { handleLogin };
