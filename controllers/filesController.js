const { uploadFile, getFileStream } = require("../bucket/s3");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

//uploading file straight to the s3 server
const handleUpload = async (req, res) => {
  const file = req.file;
  const description = req.body.description;
  console.log(file);
  console.log(description);
  const result = await uploadFile(file);
  //deleting the file from the server once uploaded to s3
  await unlinkFile(file.path);
  console.log(result);
  res.status(200).json({ imagePath: `/documents/${result.Key}` });
};
//
const handleGetFile = (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
};

module.exports = { handleUpload, handleGetFile };

//
