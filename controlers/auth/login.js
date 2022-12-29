const { HttpError } = require("http-errors");
const { User } = require("../../models");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, `Email or password is wrong`);
  }
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    throw HttpError(401, `Email or password is wrong`);
  }
};

module.exports = login;
