const Object = require("../model/Document");

const handleObjectUpload = async (req, res) => {
  if (
    !req?.body?.email ||
    !req?.body?.firstName ||
    !req?.body?.lastName ||
    !req?.body?.password
  ) {
    return res
      .status(400)
      .json({ message: "Email, password and personal data are required." });
  }
  const duplicate = await User.findOne({ email: req.body.email }).exec();
  if (duplicate) {
    return res.status(409).json({ message: "User already exists." });
  }
  try {
    //password encryption
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //storing the user
    const result = await User.create({
      id: uuidv4(),
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
      roles: req.body.role,
    });
    console.log(result);

    res.status(201).json({ success: `New user added: ${req.body.email}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleObjectUpload,
};
