const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const universitySchema = new Schema({
  name: { type: String, required: true },
  faculties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
  ],
});

module.exports = mongoose.model("University", universitySchema);
