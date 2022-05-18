const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  title: { type: String, required: true, default: "document" },
  description: { type: String, default: "No description" },
  createdBy: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  createdDate: { type: Date, default: Date.now() },
  //uniDetails: { type: Schema.Types.ObjectId, ref: "UniDetails" }, //add required = true
  fileKey: { type: String },
  viewsNum: { type: Number, default: 0 },
  //likes array
  likes: [{ type: String }],
  likesNum: { type: Number, default: 0 },
});

module.exports = mongoose.model("Document", documentSchema);
