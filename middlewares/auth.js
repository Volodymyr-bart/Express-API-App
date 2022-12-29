const jwt = require("jsonwebtoken");

const { User } = require("../models");
const HttpError = require("./HttpError");
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new HttpError(401, "Not autorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findByID(id);
    if (!user) {
      throw new HttpError(401, "Not autorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
