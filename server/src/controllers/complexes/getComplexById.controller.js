const { Complex } = require("../../db/connection");

module.exports = async (name) => {

  const complex = await Complex.findOne({ where: { name } });
  if (!complex) throw new Error("There is no complex with that ID");

  return complex;
};