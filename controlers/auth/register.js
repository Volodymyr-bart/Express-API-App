const { HttpError, sendEmail } = require("../../middlewares");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, `Email ${email} in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const verificationCode = uuidv4();
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`,
  };
  await sendEmail(verifyEmail);

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationCode,
  });
  res.status(201).json({
    status: "sucsess",
    code: 201,
    data: { user: { email, subscription } },
  });
};

module.exports = register;
