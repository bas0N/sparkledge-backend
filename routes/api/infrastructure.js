const express = require("express");
const router = express.Router();
const infrastructureController = require("../../controllers/infrastructureControllers/infrastructureControllerRETRIEVE");

router.post("/university", infrastructureController.getUniversities);
router.post("/faculty", infrastructureController.getFaculty);
router.post("/programme", infrastructureController.getProgramme);
router.post("/course", infrastructureController.getCourse);

module.exports = router;
