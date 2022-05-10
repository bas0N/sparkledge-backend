const express = require("express");
const router = express.Router();
const forgotPasswordController = require("../../controllers/forgotPasswordController");

router.route("/").post(forgotPasswordController.sendChangePassLink);
router.route("/:userId/:token").post(forgotPasswordController.handlePassChange);
module.exports = router;
