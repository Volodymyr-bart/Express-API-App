const express = require("express");
const { ctrlWrapper, validation, auth } = require("../../middlewares");
const { contacts: ctrl } = require("../../controlers");

const router = express.Router();

const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", auth, ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", auth, ctrlWrapper(ctrl.removeById));

router.put("/:contactId", auth, validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
