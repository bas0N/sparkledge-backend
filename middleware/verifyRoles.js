const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) {
      return res.sendStatus(401);
    }
    const rolesArray = [...allowedRoles];
    console.log(rolesArray);
    console.log(req.roles);
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);

    if (!result) {
      return res
        .status(401)
        .json({
          message:
            "Access denied. This account has no right to perform such operation.",
        }); //unauthorized
    }
    next();
  };
};

module.exports = verifyRoles;
