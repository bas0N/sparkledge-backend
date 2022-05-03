const User = require("../model/User");
const TokenVerifyEmail = require("../model/verifyEmailToken");
const jwt = require("jsonwebtoken");

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
    //creating jwt token for email verification with default expiration time of 15 min
    const token = jwt.sign(
      { userEmail: email },
      process.env.ACCESS_TOKEN_SECRET
    );
    //creating user object and storing it
    const result = await User.create({
      id: uuidv4(),
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
      temporaryToken: token,
    });

    console.log(result);

    const message = `${process.env.BASE_URL}register/verify/${token}`;
    await sendEmail(email, "Verify your email", message);
    console.log("email sent to an account");
    res.status(201).json({
      success: `New user added: ${email}`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    //finding the user based on the jwt token
    const user = await User.findOne({
      temporaryToken: req.params.token,
    });

    if (!user) {
      return res.status(400).json({
        message: "no_user_found",
      }); //token expired
    }
    //verification of temporary jwt token
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
    //updating the user entry in the database
    (user.temporaryToken = false), (user.verified = true), await user.save();

    res.status(200).json({ message: `Mail verified succesfully` });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

module.exports = { handleNewUser, verifyEmail };
