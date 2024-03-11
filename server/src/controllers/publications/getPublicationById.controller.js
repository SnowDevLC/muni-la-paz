const { Publication } = require("../../db/connection");

module.exports = async (id) => {

  const publication = await Publication.findOne({ where: { id } });
  if (!publication) throw new Error("There is no publication with that ID");

  return publication;
};