const mongoose = require("mongoose");
const programm = require("./Course");
const Schema = mongoose.Schema;
const facultySchema = new Schema({
  name: { type: String, required: true },
  programmes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Programme",
    },
  ],
});

module.exports = mongoose.model("Faculty", facultySchema);
