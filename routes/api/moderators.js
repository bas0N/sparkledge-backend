const express = require("express");
const router = express.Router();
const moderatorsController = require("../../controllers/moderatorsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(moderatorsController.getAllModerators)
  .post(verifyRoles(ROLES_LIST.Admin), moderatorsController.createNewModerator)
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    moderatorsController.updateModerator
  )
  .delete(verifyRoles(ROLES_LIST.Admin), moderatorsController.deleteModerator);

router.route("/:id").get(moderatorsController.getModerator);

module.exports = router;
