const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  createdBy: { type: String, required: true },
  createdDate: { type: Date, default: Date.now() },
  creatorEmail: { type: String, required: true },
  //uniDetails: { type: Schema.Types.ObjectId, ref: "UniDetails" }, //add required = true
  fileKey: { type: String, required: true },
  description: { type: String, default: "No description" },
  viewsNum: { type: Number, default: 0 },
  properties: {
    university: { type: String, required: true, default: "WUT" },
    faculty: { type: String, required: true, default: "MINI" },
    programme: { type: String, required: true, default: "CS" },
    course: { type: String, required: true, default: "Programming" }, //add course model with details
  },
  //likes array
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
