const User = require("../model/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(204).json({ message: "Cookies not found." }); //No content
  }
  const refreshToken = cookies.jwt;
  //check if the token is in db
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.status(204).json({ message: "User not found." });
  }

  //Delete refreshToken n db otherwise
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  res.clearCookie("jwt", { httpOnly: true });
  res.status(200).json({ message: "Logged out succesfully." });
};

module.exports = { handleLogout };
