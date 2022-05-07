const express = require("express");
const router = express.Router();
const infrastructureController = require("../../controllers/infrastructureController");

router.post("/university", infrastructureController.getUniversities);
router.post("/faculty", infrastructureController.getFaculties);
router.post("/programme", infrastructureController.getProgrammes);
router.post("/course", infrastructureController.getCourses);

module.exports = router;
