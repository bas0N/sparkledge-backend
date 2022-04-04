var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var uniDetailsSchema = new Schema({
  university: { type: String, required: true, default: "WUT" },
  faculty: { type: String, required: true, default: "MINI" },
  programme: { type: String, required: true, default: "CS" },
  course: { type: String, required: true, default: "Programming" }, //add course model with details
});

module.exports = mongoose.model("UniDetails", uniDetailsSchema);
