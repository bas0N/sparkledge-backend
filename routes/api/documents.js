const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const documentsController = require("../../controllers/documentsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .post(upload.single("document"), documentsController.handleUploadDocument);

router
  .route("/:key")
  .get(verifyRoles(ROLES_LIST.User), documentsController.handleGetFile);

router
  .route("/likes")
  .post(verifyRoles(ROLES_LIST.Admin), documentsController.addLike);

module.exports = router;
