var ObjectId = require("mongodb").ObjectID;
const Document = require("../../model/Document");
const Course = require("../../model/Course");
const University = require("../../model/University");
const Faculty = require("../../model/Faculty");
const Programme = require("../../model/Programme");

//retrieving a list of universities with nested faculties from the db
const getUniversities = async (req, res) => {
  try {
    const universities = await University.find().populate("faculties");
    //no faculties found
    if (!universities) {
      return res.status(404).json({
        message: `No universities found.`,
      });
    }
    res.status(200).json(universities);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Universities retrieval error: ${err.message}` });
  }
};

//retrieving faculty details from the db given the faculty id
const getFaculty = async (req, res) => {
  try {
    console.log(req.body.facultyId);
    const faculties = await Faculty.findOne({
      _id: ObjectId(req.body.facultyId),
    }).populate("programmes");

    //no faculties found
    if (!faculties) {
      return res.status(404).json({
        message: `No faculties found.`,
      });
    }

    res.status(200).json(faculties);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Faculties retrieval error: ${err.message}` });
  }
};
//retrieving programme details from the db given the programme id

const getProgramme = async (req, res) => {
  try {
    const programmes = await Programme.findOne({
      _id: ObjectId(req.body.programmeId),
    }).populate("courses");

    //no programmes found
    if (!programmes) {
      return res.status(400).json({
        message: `No programmes found.`,
      });
    }
    res.status(200).json(programmes);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Faculties retrieval error: ${err.message}` });
  }
};
//retrieving a list of courses from the db given the programme id
const getCourse = async (req, res) => {
  try {
    const courses = await Course.findOne({
      _id: ObjectId(req.body.courseId),
    }).populate("documents");

    //no courses found
    if (!courses) {
      return res.status(400).json({
        message: `No courses found.`,
      });
    }
    res.status(200).json(courses);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Courses retrieval error: ${err.message}` });
  }
};
const getDocument = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: ObjectId(req.body.documentId),
    });

    //no courses found
    if (!document) {
      return res.status(400).json({
        message: `No courses found.`,
      });
    }
    res.status(200).json(document);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Document retrieval error: ${err.message}` });
  }
};

module.exports = {
  getUniversities,
  getFaculty,
  getProgramme,
  getCourse,
  getDocument,
};
