const express = require("express");
const router = express.Router();
const objectsController = require("../../controllers/objectsController");

const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .post(verifyRoles(ROLES_LIST.User), objectsController.handleObjectUpload);

router
  .route("/:key")
  .get(verifyRoles(ROLES_LIST.User), objectsController.handleGetObject);
module.exports = router;
