const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    //console.log(rolesArray);
    console.log(req.roles);
    if (!req?.roles) {
      return res
        .status(401)
        .json({ message: "No request or no role provided." });
    }
    const rolesArray = [...allowedRoles];

    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);

    if (!result) {
      return res.status(401).json({
        message:
          "Access denied. This account has no right to perform such operation.",
      }); //unauthorized
    }
    next();
  };
};

module.exports = verifyRoles;
