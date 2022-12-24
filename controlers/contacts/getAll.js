const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const result = await Contact.find({});
  console.log(result);
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = getAll;
