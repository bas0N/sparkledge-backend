const User = require("../model/User");

const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required." });
  }

  const foundUser = await User.findOne({ email: email }).exec();
  console.log(foundUser);
  if (!foundUser) return res.sendStatus(401); //Unauthorised
  const comparison = bcrypt.compare(password, foundUser.password);
  if (comparison) {
    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "45s" }
    );
    const refreshToken = jwt.sign(
      {
        email: foundUser.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //take care of it
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    //write the user to the file
    console.log(result);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      ///  secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); //one day valid cookie
    res.json({ accessToken });
  } else {
    res.sendStatus(401); //Unautorised
  }
};

module.exports = { handleLogin };
