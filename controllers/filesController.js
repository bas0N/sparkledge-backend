const { uploadFile, getFileStream } = require("../bucket/s3");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const Document = require("../model/Document");
const UniDetails = require("../model/UniDetails");

const handleUpload = async (req, res) => {
  //check if the file was attached
  if (!req.file) {
    return res.status(400).json({ message: "No file attached." });
  }
  try {
    const file = req.file;
    const description = req.body.description;
    console.log(file);
    console.log(description);
    const results3 = await uploadFile(file);
    //deleting the file from the server once uploaded to s3
    await unlinkFile(file.path);
    console.log(results3);
    //res.status(200).json({ imagePath: `/documents/${results3.Key}` });
    //setting uni details
    const uniDetails = new UniDetails({});
    const result = await Document.create({
      createdBy: req.id,
      creatorEmail: req.email,
      uniDetails: uniDetails,
      fileKey: results3.Key,
      description: description,
    });
    console.log(result);

    res.status(201).json({ success: `New document added.` });
  } catch (err) {
    res.status(500).json({ message: `Database error: ${err.message}` });
  }
};
const handleGetFile = (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
};

module.exports = { handleUpload, handleGetFile };
