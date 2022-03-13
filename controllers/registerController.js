const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const handleNewUser = async (req, res) => {
  const { email, firstname, lastname, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required." });
  }
  const duplicate = usersDB.users.find((person) => person.email === email);
  if (duplicate) {
    return res.sendStatus(409);
  }
  try {
    //password encryption
    const hashedPassword = await bcrypt.hash(password, 10);
    //storing the user
    const newUser = {
      id: uuidv4(),
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: hashedPassword,
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    console.log(usersDB.users);
    res.status(201).json({ success: `New user added:${email}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
