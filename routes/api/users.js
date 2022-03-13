const express = require("express");
const router = express.Router();
const path = require("path");
const data = {};
const userController = require("../../controllers/usersController");
data.employes = require("../../model/users.json");

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.updateUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);
router.route("/:id").get(userController.getUser);

module.exports = router;
