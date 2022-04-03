const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  createdBy: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  fileKey: { type: String, required: true },
  description: { type: String, default: "No description" },
  viewsNum: { type: Number, default: 0 },
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Document", documentSchema);
