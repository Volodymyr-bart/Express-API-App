const express = require("express");
const { auth, ctrlWrapper, validation } = require("../../middlewares");
const { auth: ctrl } = require("../../controlers");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post("/register", validation(joiRegisterSchema), ctrlWrapper(ctrl.register));
router.get("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
