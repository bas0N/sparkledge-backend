const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenVerifyEmailSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("TokenVerifyEmail", tokenVerifyEmailSchema);
