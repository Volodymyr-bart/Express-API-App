const { HttpError } = require("../../middlewares");
const { User } = require("../../models");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, `Email ${email} in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ email, password: hashPassword, subscription });
  res.status(201).json({
    status: "sucsess",
    code: 201,
    data: { user: { email, subscription } },
  });
};

module.exports = register;
