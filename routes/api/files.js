const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const filesController = require("../../controllers/filesController");

router
  .route("/documents")
  .post(upload.single("document"), filesController.handleUpload);

router.route("/documents/:key").get(filesController.handleGetFile);
module.exports = router;
