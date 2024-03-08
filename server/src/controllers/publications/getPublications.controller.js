const { Publication } = require("../../db/connection");

module.exports = async () => {

  const allPublications = await Publication.findAll({ order: [['date', 'DESC']] });

  return allPublications;
};