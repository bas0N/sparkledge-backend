var ObjectId = require("mongodb").ObjectID;
const Document = require("../model/Document");
const Course = require("../model/Course");
const University = require("../model/University");
const Faculty = require("../model/Faculty");
const Programme = require("../model/Programme");

const getUniversities = async (req, res) => {
  try {
    const universities = await University.find().populate("faculties");
    res.status(200).json(universities);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Universities retrieval error: ${err.message}` });
  }
};

const getFaculties = async (req, res) => {
  try {
    console.log(req.body.facultyid);
    const faculties = await Faculty.findOne({
      _id: ObjectId(req.body.facultyid),
    }).populate("programmes");

    //no faculties found
    if (!faculties) {
      return res.status(400).json({
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

const getProgrammes = async (req, res) => {
  try {
    const programmes = await Programme.findOne({
      _id: ObjectId(req.body.programmeid),
    }).populate("courses");

    //no documents found
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

const getCourses = async (req, res) => {
  try {
    const courses = await Course.findOne({
      _id: ObjectId(req.body.courseid),
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

module.exports = {
  getUniversities,
  getFaculties,
  getProgrammes,
  getCourses,
};
