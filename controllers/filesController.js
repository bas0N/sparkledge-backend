const handleUpload = async (req, res) => {
  const file = req.file;
  const description = req.body.description;
  res.status(200).json({ message: "File uploaded successfully." });
};

module.exports = { handleUpload };
