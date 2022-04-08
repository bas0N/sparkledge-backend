const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  title: { type: String, required: true, default: "document" },
  description: { type: String, default: "No description" },
  createdBy: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  createdDate: { type: Date, default: Date.now() },
  //uniDetails: { type: Schema.Types.ObjectId, ref: "UniDetails" }, //add required = true
  fileKey: { type: String, required: true },
  viewsNum: { type: Number, default: 0 },
  properties: {
    university: { type: String, required: true, default: "WUT" },
    faculty: { type: String, required: true, default: "MINI" },
    programme: { type: String, required: true, default: "CS" },
    course: { type: String, required: true, default: "Programming" }, //add course model with details
  },
  //likes array
  likes: [{ type: String, default: 0 }],
  likesNum: { type: Number, default: 0 },
});

module.exports = mongoose.model("Document", documentSchema);
