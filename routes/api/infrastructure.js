const express = require("express");
const router = express.Router();
const infrastructureController = require("../../controllers/infrastructureController");

router.get("/university", infrastructureController.getUniversities);
router.get("/faculty", infrastructureController.getFaculties);
router.get("/programme", infrastructureController.getProgrammes);
router.get("/course", infrastructureController.getCourses);

module.exports = router;
