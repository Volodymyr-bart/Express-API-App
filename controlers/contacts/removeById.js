const { Contact } = require("../../models");
const { HttpError } = require("../../middlewares");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw new HttpError(404, `Contact with id ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = removeById;
