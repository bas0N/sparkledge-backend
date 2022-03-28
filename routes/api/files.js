const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const filesController = require("../../controllers/filesController");

router.route("/").post(upload.single("document"), filesController.handleUpload);

module.exports = router;
