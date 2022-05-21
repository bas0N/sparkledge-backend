const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  roles: {
    User: { type: Number, default: 2001 },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
  },
  temporaryToken: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  refreshToken: String,
  viewed: [{ type: String }],
});

module.exports = mongoose.model("User", userSchema);
