const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  // res.status(204).json();
  res.json({
    message: "Logout success",
  });
};

module.exports = logout;
