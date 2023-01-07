const { Contact } = require("../../models");

const getAll = async (req, res) => {
  // console.log(Contact);
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email subscription");
  console.log(result);
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = getAll;
