var ObjectId = require("mongodb").ObjectID;
const Document = require("../../model/Document");
const Course = require("../../model/Course");
const University = require("../../model/University");
const Faculty = require("../../model/Faculty");
const Programme = require("../../model/Programme");
//adds a new university to the database
const addUniversity = async (req, res) => {
  //checks if the name has been included in the body
  if (!req.body.name) {
    return res.status(400).json({ message: "No name included." });
  }
  //check if the university already exists
  uni = await University.find({
    name: req.body.name,
  });
  if (uni) {
    res.status(409).json({
      message: `Conflict. University with name ${req.body.name} already exists.`,
    });
  }
  //trying to add the university
  try {
    const univeristy = await University.create({
      name: req.body.name,
    });
    res.status(201).json({ success: `New university added.` });
  } catch (err) {
    res.status(500).json({ message: `Database error: ${err.message}` });
  }
};

//adds a new faculty to the database given the univeristy id
const addFaculty = async (req, res) => {
  //checks if the name has been included in the body
  if (!req.body.name) {
    return res.status(400).json({ message: "No name included." });
  } else if (!req.body.universityid) {
    return res.status(400).json({ message: "No university id provided." });
  }
  //check if the faculty already exists
  fac = await Faculty.find({
    name: req.body.name,
  });
  if (fac) {
    res.status(409).json({
      message: `Conflict. University with name ${req.body.name} already exists.`,
    });
  }
  try {
    const faculty = await Faculty.create({
      name: req.body.name,
    });
    await University.updateOne(
      { _id: ObjectId(req.body.universityid) },
      { $push: { faculties: faculty } }
    );
    res.status(201).json({ success: `New faculty added.` });
  } catch (err) {
    res.status(500).json({ message: `Database error: ${err.message}` });
  }
};

//adds a new programme to the database given the faculty id
const addProgramme = async (req, res) => {
  //checks if the name has been included in the body
  if (!req.body.name) {
    return res.status(400).json({ message: "No name included." });
  } else if (!req.body.facultyid) {
    return res.status(400).json({ message: "No faculty id provided." });
  }
  try {
    const programme = await Programme.create({
      name: req.body.name,
    });
    await Faculty.updateOne(
      { _id: ObjectId(req.body.facultyid) },
      { $push: { programmes: programme } }
    );
    res.status(201).json({ success: `New programme added.` });
  } catch (err) {
    res.status(500).json({ message: `Database error: ${err.message}` });
  }
};
//adds a new course to the database given the programme id
const addCourse = async (req, res) => {
  //checks if the name has been included in the body
  if (!req.body.name) {
    return res.status(400).json({ message: "No name included." });
  } else if (!req.body.courseid) {
    return res.status(400).json({ message: "No course id provided." });
  }
  try {
    const course = await Course.create({
      name: req.body.name,
    });
    await Faculty.updateOne(
      { _id: ObjectId(req.body.programmeid) },
      { $push: { courses: course } }
    );
    res.status(201).json({ success: `New course added.` });
  } catch (err) {
    res.status(500).json({ message: `Database error: ${err.message}` });
  }
};
//to add document, use /document/ endpoint
module.exports = {
  addUniversity,
  addFaculty,
  addProgramme,
  addCourse,
};
