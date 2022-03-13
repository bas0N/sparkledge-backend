const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");
const { response } = require("express");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required." });
  }

  const foundUser = usersDB.users.find((person) => person.email == email);
  if (!foundUser) return res.sendStatus(401); //Unauthorised
  const comparison = bcrypt.compare(password, foundUser.password);
  if (comparison) {
    res.json({ success: `User ${email} is logged in` });
  } else {
    res.sendStatus(401); //Unautorised
  }
};

module.exports = { handleLogin };
