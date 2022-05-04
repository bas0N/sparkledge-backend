const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const programmeSchema = new Schema({
  name: { type: String, required: true, default: "document" },
  courses:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },]
});

module.exports = mongoose.model("Programme", programmeSchema);
