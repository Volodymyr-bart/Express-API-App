const { sendEmail, HttpError } = require("../../middlewares");
const { User } = require("../../models");
require("dotenv").config();

const { BASE_URL } = process.env;

const reVerify = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw HttpError(401, `Email or password is wrong`);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, `User with ${email} was not found`);
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "email verification letter",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Please, verify your email</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = reVerify;
