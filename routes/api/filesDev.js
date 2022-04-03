const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const filesController = require("../../controllers/filesControllerDev");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/documents")
  .post(
    verifyRoles(ROLES_LIST.User),
    upload.single("document"),
    filesController.handleUpload
  );

router
  .route("/documents/:key")
  .get(verifyRoles(ROLES_LIST.User), filesController.handleGetFile);
module.exports = router;
