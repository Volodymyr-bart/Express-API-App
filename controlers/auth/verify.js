const { HttpError } = require("../../middlewares");
const { User } = require("../../models");

const verify = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw HttpError(404);
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verificationCode: "" });
  res.json({ message: "verify Success" });
};

module.exports = verify;
