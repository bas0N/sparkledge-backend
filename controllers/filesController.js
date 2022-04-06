const { uploadFile, getFileStream } = require("../bucket/s3");
var ObjectId = require("mongodb").ObjectId;

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const Document = require("../model/Document");
const UniDetails = require("../model/UniDetails");

const handleUploadDocument = async (req, res) => {
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
    const result = await Document.create({
      title: req.body.title,
      createdBy: req.id,
      creatorEmail: req.email,
      //uniDetails: uniDetails,
      properties: {
        university: req.body.university,
        faculty: req.body.faculty,
        programme: req.body.programme,
        course: req.body.course,
      },
      fileKey: results3.Key,
      description: description,
    });
    console.log(result);

    res.status(201).json({ success: `New document added.` });
  } catch (err) {
    res.status(500).json({ message: `Database error: ${err.message}` });
  }
};
//get files depending on categories given in the request body (first 20)

const handleGetDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      properties: {
        university: req.body.university,
        faculty: req.body.faculty,
        programme: req.body.programme,
        course: req.body.course, //add course model with details
      },
    }).exec();
    //no documents found
    if (!documents.length) {
      return res.status(400).json({
        message: `No document matches for the values searched.`,
      });
    }
    res.status(200).json(documents);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Document retrieval error: ${err.message}` });
  }
};

//add like/dislike
const addLike = async (req, res) => {
  try {
    userId = req.id;
    documentId = req.body.documentId;
    console.log(documentId);
    document = await Document.find({
      _id: new ObjectId(documentId),
    });
    if (!document) {
      res.status(404).json({ message: `Document not found: ${err.message}` });
    }
    if (!document.likes.includes(userId)) {
      Document.updateOne(
        { _id: ObjectID(documentId) },
        { $push: { likes: req.id } }
      );
    }
    console.log(req.id);
    console.log(document);
    res.status(200).json(document);
  } catch (err) {
    res.status(500).json({ message: `Internal error: ${err.message}` });
  }

  //console.log(liked);
  /*
  liked = Document.find({ likes: userId });
  if (liked) {
    res.status(200).json({ message: "Document already liked" });
  } else {
    Document.findAndUpdate(
      { _id: req.body.documentId }, //id of the document in the parameter
      { $push: { likes: req.id } }, //id of the user
      done
    );
  }
  */
};

//retrieving data from s3
const handleGetFile = (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
};

module.exports = {
  handleUploadDocument,
  handleGetFile,
  handleGetDocuments,
  addLike,
};
