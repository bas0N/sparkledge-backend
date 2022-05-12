const express = require("express");
const router = express.Router();
const forgotPasswordController = require("../../controllers/forgotPasswordController");

router.route("/").post(forgotPasswordController.sendChangePassLink);
router.route("/:email/:token").post(forgotPasswordController.handlePassChange);
module.exports = router;
