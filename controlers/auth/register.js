const { HttpError } = require("../../middlewares");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, `Email ${email} in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const result = await User.create({ email, password: hashPassword, subscription, avatarURL });
  res.status(201).json({
    status: "sucsess",
    code: 201,
    data: { user: { email, subscription } },
  });
};

module.exports = register;
