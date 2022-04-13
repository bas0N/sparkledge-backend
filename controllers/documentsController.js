const { uploadFile, getFileStream } = require("../bucket/s3");
var ObjectId = require("mongodb").ObjectId;

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const Document = require("../model/Document");

const handleGetDocumentsDev = async (req, res) => {
  try {
    console.log(req.body.description);
    const documents = await Document.find({
      description: {
        $regex: new RegExp(req.body.description),
        $options: "i",
      },
    }).exec();

    //no documents found
    if (!documents.length) {
      return res.status(400).json({
        message: `No document matches for the values searched.`,
      });
    }

    res.status(200).json({ description: documents });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Document retrieval error: ${err.message}` });
  }
};
const handleUploadDocument = async (req, res) => {
  //check if the file was attached
  if (!req.file) {
    return res.status(400).json({ message: "No file attached." });
  }
  try {
    const file = req.file;
    const resultS3 = await uploadFile(file);
    //deleting the file from the server once uploaded to s3
    await unlinkFile(file.path);
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
      fileKey: resultS3.Key,
      description: req.body.description,
    });
    res.status(201).json({ success: `New document added.` });
  } catch (err) {
    res.status(500).json({ message: `Database error: ${err.message}` });
  }
};
//get files depending on categories given in the request body (first 20)
const handleGetDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      title: {
        $regex: new RegExp(req.body.title),
        $options: "i",
      },
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

//add like to the element of the given id
const addLike = async (req, res) => {
  try {
    userId = req.id;
    documentId = req.body.documentId;
    //finding if the document exists
    document = await Document.find({
      _id: new ObjectId(documentId),
    });
    if (!document) {
      res.status(404).json({ message: `Document not found: ${err.message}` });
    }
    //finding if the document has already been liked by the user
    if (!document[0].likes.includes(userId)) {
      //adding user to a list of users who liked the document
      await Document.updateOne(
        { _id: ObjectId(documentId) },
        { $push: { likes: req.id } }
      );
      await Document.updateOne(
        { _id: ObjectId(documentId) },
        { $inc: { likesNum: 1 } }
      );
      res.status(200).json({ message: "Document liked successfully" });
    } else {
      //removing like
      await Document.updateOne(
        { _id: ObjectId(documentId) },
        { $pull: { likes: req.id } }
      );
      await Document.updateOne(
        { _id: ObjectId(documentId) },
        { $inc: { likesNum: -1 } }
      );
      res.status(200).json({ message: "Document disliked successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: `Internal error: ${err.message}` });
  }
};
//retrieving a document from the DB
const handleGetDocument = async (req, res) => {
  try {
    documentId = req.body.documentId;
    document = await Document.find({
      _id: new ObjectId(documentId),
    });
  } catch (err) {}
};

//retrieving data from s3
const handleGetFile = async (req, res) => {
  try {
    //getting the data from s3
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
    //incrementing the viewcount
    await Document.updateOne(
      { fileKey: req.params.key },
      { $inc: { viewsNum: 1 } }
    );
  } catch (err) {
    res.status(500).json({ message: `Internal error: ${err.message}` });
  }
};

module.exports = {
  handleUploadDocument,
  handleGetFile,
  handleGetDocuments,
  addLike,
  handleGetDocument,
  handleGetDocumentsDev,
};
