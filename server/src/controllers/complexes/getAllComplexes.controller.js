const { Complex } = require("../../db/connection");

module.exports = async () => {
  
  const allComplexes = await Complex.findAll({ order: [['id', 'DESC']] });

  return allComplexes;
};