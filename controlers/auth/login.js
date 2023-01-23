const { HttpError } = require("http-errors");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, `Email or password is wrong`);
  }
  if (!user.verify) {
    throw HttpError(401, `Not verify`);
  }

  const passCompare = await bcrypt.compare(password, user.password);
  if (!passCompare) {
    throw HttpError(401, `Email or password is wrong`);
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: `23h` });
  console.log("token", token);
  await User.findByIdAndUpdate(user._id, { token });
  res.json({ email: user.email, token });
};

module.exports = login;
