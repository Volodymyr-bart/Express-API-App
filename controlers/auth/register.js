const { HttpError } = require("../../middlewares");
const { User } = require("../../models");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, `Email ${email} in use`);
  }
  const result = await User.create({ email, password, subscription });
  res.status(201).json({
    status: "sucsess",
    code: 201,
    data: { user: { email, subscription } },
  });
};

module.exports = register;
