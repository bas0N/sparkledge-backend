const User = require("../model/User");
const TokenVerifyEmail = require("../model/verifyEmailToken");
const sendEmail = require("../config/email");
const bcrypt = require("bcrypt");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

const handleNewUser = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  //console.log(req.body);
  if (!email || !password || !firstName || !lastName) {
    return res
      .status(400)
      .json({ message: "Email, password and personal data are required." });
  }
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) {
    return res.status(409).json({ message: "User already exists." });
  }
  try {
    //password encryption
    const hashedPassword = await bcrypt.hash(password, 10);
    //storing the user
    const result = await User.create({
      id: uuidv4(),
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
    });
    console.log(result);
    let token = await new TokenVerifyEmail({
      userEmail: email,
      token: uuidv4().toString(),
    }).save();

    const message = `${process.env.BASE_URL1}register/verify/${email}/${token.token}`;
    await sendEmail(email, "Verify your email", message);
    console.log("email sent to an account");
    res.status(201).json({
      success: `New user added:${email}`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).exec();
    if (!user) {
      return res.status(400).json({ message: "Invalid link" });
    }
    const token = await TokenVerifyEmail.findOne({
      userEmail: user.email,
      token: req.params.token,
    }).exec();
    if (!token) {
      return res.status(400).json({ message: "Invalid link" });
    }
    await User.updateOne({ email: user.email, verified: true });
    //token to be removed
    res.status(200).json({ message: `Mail verified succesfully` });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

module.exports = { handleNewUser, verifyEmail };
