const { v4 } = require("uuid");

const data = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
data.users = require("../model/users.json");

const getAllUsers = (req, res) => {
  res.json(data.users);
};

const createNewUser = (req, res) => {
  const newUser = {
    id: v4.v4(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newUser.firstname || !newUser.lastname) {
    return res
      .status(400)
      .json({ message: "First and last name are required" });
  }
  data.setUsers([...data.users, newUser]);
  res.status(201).json(data.users);
};

const addNewUser = (req, res) => {
  res.json({ name: req.body.firstname, password: req.body.password });
};

const updateUser = (req, res) => {
  const user = data.users.find((user) => user.id === parseInt(req.body.id));
  if (!user) {
    return res
      .status(400)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  if (req.body.firstname) user.firstname = req.body.firstname;
  if (req.body.lastname) user.lastname = req.body.lastname;
  const filteredArray = data.users.filter(
    (user) => user.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, user];
  data.setUsers(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.users);
};

const deleteUser = (req, res) => {
  const user = data.users.find((user) => user.id === parseInt(req.body.id));
  if (!user) {
    return res
      .status(400)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  const filteredArray = data.users.filter(
    (user) => user.id !== parseInt(req.body.id)
  );
  data.setUsers([...filteredArray]);
  res.json(data.users);
};

const getUser = (req, res) => {
  const user = data.users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res
      .status(400)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(user);
};

module.exports = {
  getAllUsers,
  addNewUser,
  updateUser,
  deleteUser,
  getUser,
};
