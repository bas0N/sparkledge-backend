const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const documentsController = require("../../controllers/documentsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .post(upload.array("file"), documentsController.handleUploadDocument);

router
  .route("/getDocument/:documentId")
  .get(documentsController.handleGetDocument);

router.route("/:key").get(documentsController.handleGetFile);

router.route("/likes").post(documentsController.addLike);

module.exports = router;
