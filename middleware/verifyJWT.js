const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer")) {
    return res.sendStatus(401);
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log(decoded.UserInfo);
    if (err) {
      return res.status(403).json({ message: "Invalid token." }); //invalid token forbidden access
    }

    req.email = decoded.UserInfo.email;
    req.roles = decoded.UserInfo.roles;
    req.id = decoded.UserInfo.id;
    next();
  });
};

module.exports = verifyJWT;
