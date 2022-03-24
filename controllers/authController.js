const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required." });
  }

  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.status(401).json({ message: "User not found" }); //Unauthorised

  const comparison = await bcrypt.compare(password, foundUser.password);
  if (comparison) {
    const roles = Object.values(foundUser.roles);
    console.log(`auth controller + ${roles}`);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      {
        email: foundUser.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    console.log(`auth controller + ${refreshToken}`);

    //take care of it
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    //write the user to the file
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); //one day valid cookie
    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ message: "Invalid email or password." }); //Unautorised
  }
};

module.exports = { handleLogin };
