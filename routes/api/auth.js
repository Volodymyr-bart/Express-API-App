const express = require("express");
const { auth, ctrlWrapper, validation, upload } = require("../../middlewares");
const { auth: ctrl } = require("../../controlers");

const { joiRegisterSchema, joiLoginSchema, reVerify } = require("../../models/user");

const router = express.Router();

router.post("/register", validation(joiRegisterSchema), ctrlWrapper(ctrl.register));
router.get("/verify/:verificationCode", ctrl.verify);
router.get("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.post("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));
router.post("/verify", validation(reVerify), ctrlWrapper(ctrl.reVerify));

module.exports = router;
