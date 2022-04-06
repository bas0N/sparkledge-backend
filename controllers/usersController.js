const { v4 } = require("uuid");
const User = require("../model/User");
//data.users = require("../model/users.json");
const bcrypt = require("bcrypt");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

const getAllUsers = async (req, res) => {
  console.log(`the id is: ${req.id}`);
  const users = await User.find();
  if (!users) {
    return res.status(204).json({ message: "No users found." });
  }
  res.status(200).json(users);
};

const createNewUser = async (req, res) => {
  if (
    !req?.body?.email ||
    !req?.body?.firstName ||
    !req?.body?.lastName ||
    !req?.body?.password
  ) {
    return res
      .status(400)
      .json({ message: "Email, password and personal data are required." });
  }
  const duplicate = await User.findOne({ email: req.body.email }).exec();
  if (duplicate) {
    return res.status(409).json({ message: "User already exists." });
  }
  try {
    //password encryption
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //storing the user
    const result = await User.create({
      id: uuidv4(),
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
      roles: req.body.role,
    });
    console.log(result);

    res.status(201).json({ success: `New user added: ${req.body.email}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  if (req?.body?.id) {
    return res.status(400).json({ message: "Id is required." });
  }
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(400)
      .json({ message: `No user matches Id of: ${req.body.id}` });
  }
  if (req.body?.firstname) user.firstname = req.body.firstname;
  if (req.body?.lastname) user.lastname = req.body.lastname;
  const result = await user.save();
  res.status(200).json(result);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "User ID required." });
  }
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(400)
      .json({ message: `No user matches Id of: ${req.body.id}` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.status(200).json({ message: "User deleted succesfully" });
};

const getUser = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "User ID required." });
  }
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(400)
      .json({ message: `No user matches Id of: ${req.params.id}` });
  }
  res.status(200).json(user);
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
  createNewUser,
};
