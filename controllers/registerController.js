const User = require("../model/User");
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

const handleNewUser = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  //console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required." });
  }
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) {
    return res.sendStatus(409);
  }
  try {
    //password encryption
    const hashedPassword = await bcrypt.hash(password, 10);
    //storing the user
    const result = await User.create({
      id: uuidv4(),
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
    });
    console.log(result);

    res.status(201).json({ success: `New user added:${email}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
