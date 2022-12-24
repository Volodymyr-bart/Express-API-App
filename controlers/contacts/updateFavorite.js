const { Contact } = require("../../models");
const { HttpError } = require("../../middlewares");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    throw new HttpError(400, `Missing field favorite`);
  }
  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

  if (!result) {
    throw new HttpError(404, `Contact with id ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = updateFavorite;
