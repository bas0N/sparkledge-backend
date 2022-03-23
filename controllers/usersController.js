const { v4 } = require("uuid");
const User = require("../model/User");
//data.users = require("../model/users.json");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(204).json({ message: "No users found." });
  }
  res.json(users);
};

const createNewUser = async (req, res) => {
  if (
    !newUser?.body?.email ||
    !newUser?.body?.firstname ||
    !newUser?.body?.lastname
  ) {
    return res
      .status(400)
      .json({ message: "Email, first and last names are required" });
  }
  //
  try {
    const result = await User.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

const addNewUser = (req, res) => {
  res.json({ name: req.body.firstname, password: req.body.password });
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
  res.json(result);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "Employee ID required." });
  }
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(400)
      .json({ message: `No user matches Id of: ${req.body.id}` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(data.users);
};

const getUser = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "Employee ID required." });
  }
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(400)
      .json({ message: `No user matches Id of: ${req.params.id}` });
  }
  res.json(user);
};

module.exports = {
  getAllUsers,
  addNewUser,
  updateUser,
  deleteUser,
  getUser,
  createNewUser,
};
