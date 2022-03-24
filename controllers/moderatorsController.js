const Moderator = require("../model/Moderator");

const getAllModerators = async (req, res) => {
  const moderators = await Moderator.find();
  if (!moderators)
    return res.status(204).json({ message: "No moderators found." });
  res.json(moderators);
};

const createNewModerator = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required" });
  }

  try {
    const result = await Moderator.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateModerator = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const moderator = await Moderator.findOne({ _id: req.body.id }).exec();
  if (!moderator) {
    return res
      .status(204)
      .json({ message: `No moderator matches ID ${req.body.id}.` });
  }
  if (req.body?.firstname) moderator.firstname = req.body.firstname;
  if (req.body?.lastname) moderator.lastname = req.body.lastname;
  const result = await moderator.save();
  res.json(result);
};

const deleteModerator = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Moderator ID required." });

  const moderator = await Moderator.findOne({ _id: req.body.id }).exec();
  if (!moderator) {
    return res
      .status(204)
      .json({ message: `No moderator matches ID ${req.body.id}.` });
  }
  const result = await moderator.deleteOne({ _id: req.body.id });
  res.json({ message: `Moderator ${req.body.id} deleted succesfully` });
};

const getModerator = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Moderator ID required." });

  const moderator = await Moderator.findOne({ _id: req.params.id }).exec();
  if (!moderator) {
    return res
      .status(204)
      .json({ message: `No moderator matches ID ${req.params.id}.` });
  }
  res.json(moderator);
};

module.exports = {
  getAllModerators,
  createNewModerator,
  updateModerator,
  deleteModerator,
  getModerator,
};
