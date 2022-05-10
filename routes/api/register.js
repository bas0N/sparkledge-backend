const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/registerController");
const User = require("../../model/User");

router.post("/", registerController.handleNewUser);

router.get("/verify/:token", registerController.verifyEmail);

module.exports = router;
