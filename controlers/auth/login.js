const { HttpError } = require("http-errors");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

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
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: `1h` });
  res.json({ status: "success", code: 200, data: { token } });
};

module.exports = login;
