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
    default: "0000000000000",
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("TokenVerifyEmail", tokenVerifyEmailSchema);
