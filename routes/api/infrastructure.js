const express = require("express");
const router = express.Router();
const infrastructureControllerFETCH = require("../../controllers/infrastructureControllers/infrastructureControllerFETCH");
const infrastructureControllerCREATE = require("../../controllers/infrastructureControllers/infrastructureControllerCREATE");

const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

//enpoints for retrieving infrastructure elements (no login, no role needed)
router.post("/university", infrastructureControllerFETCH.getUniversities);
router.post("/faculty", infrastructureControllerFETCH.getFaculty);
router.post("/programme", infrastructureControllerFETCH.getProgramme);
router.post("/course", infrastructureControllerFETCH.getCourse);

//!! TO BE CHECKED FOR SECURITY!!
//enpoints for creating infrastructure elements (login and role needed )
router
  .route("/university/new")
  .post(infrastructureControllerCREATE.addUniversity);
router
  .route("/faculty/new")
  .post(
    verifyRoles(ROLES_LIST.Admin),
    infrastructureControllerCREATE.addFaculty
  );
router
  .route("/programme/new")
  .post(
    verifyRoles(ROLES_LIST.Admin),
    infrastructureControllerCREATE.addProgramme
  );
router
  .route("/course/new")
  .post(
    verifyRoles(ROLES_LIST.Admin),
    infrastructureControllerCREATE.addCourse
  );

module.exports = router;
