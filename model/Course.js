const mongoose = require("mongoose");
const documentSchema = require("./Document");
const Schema = mongoose.Schema;
const courseSchema = new Schema({
  name: { type: String, required: true, default: "course1" },
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  ],
  semester: { type: Number },
});

module.exports = mongoose.model("Course", courseSchema);
