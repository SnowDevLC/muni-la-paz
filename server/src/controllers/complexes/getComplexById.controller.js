const { Complex } = require("../../db/connection");

module.exports = async (id) => {

  const complex = await Complex.findOne({ where: { id } });
  if (!complex) throw new Error("There is no complex with that ID");

  return complex;
};