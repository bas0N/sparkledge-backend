const User = require("../model/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../config/email");

const sendChangePassLink = async (req, res) => {
  try {
    //check if the email has been provided
    if (!req.body.email) {
      return res.status(400).json({ message: "Email is required." });
    }
    //check if the user exists
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist." });
    }
    //creating a token
    const token = jwt.sign(
      { userEmail: req.body.email },
      process.env.ACCESS_TOKEN_SECRET
    );
    //assigning the token to a user and saving it
    user.temporaryToken = token;
    await user.save();
    //creating and sending a message with a link leading to a page where password
    //reset request will be executed
    const message = `https://www.sparkledge.pl/forgot-password?token=${token}`;
    await sendEmail(req.body.email, "Reset your password", message);
    console.log("email sent to an account");
    res.status(201).json({
      success: `Email with password reset instructions succesfully sent to: ${req.body.email}`,
    });
  } catch (err) {
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
};
const handlePassChange = async (req, res) => {
  try {
    //check if the token and new password have been provided
    if (!req.params.token || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    //check if a user with a given token exists
    const user = await User.findOne({
      temporaryToken: req.params.token,
    }).exec();
    if (!user) {
      return res
        .status(404)
        .json({ message: "User doesn't exist or token is invalid." });
    }
    //verify if the token is still valid
    jwt.verify(
      req.params.token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(400).json({
            message: "Activation link has expired.",
          }); //token expired
        }
      }
    );
    user.password = req.body.password;
    user.temporaryToken = false;
    await user.save();
    res.status(200).json({ message: `Password has been changed succesfully.` });
  } catch (err) {
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
};

module.exports = { sendChangePassLink, handlePassChange };
