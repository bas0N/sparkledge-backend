const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/registerController");
const User = require("../../model/User");
const TokenVerifyEmail = require("../../model/verifyEmailToken");

router.post("/", registerController.handleNewUser);

router.get("/verify/:token", registerController.verifyEmail);

module.exports = router;
