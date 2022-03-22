const express = require("express");
const router = express.Router();
const path = require("path");
const data = {};
const userController = require("../../controllers/usersController");
data.employes = require("../../model/users.json");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(userController.getAllUsers)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    userController.createNewUser
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    userController.updateUser
  )
  .delete(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    userController.deleteUser
  );
router.route("/:id").get(userController.getUser);

module.exports = router;
