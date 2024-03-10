const { Publication } = require("../../db/connection");

module.exports = async (title) => {

  const publication = await Publication.findOne({ where: { title } });
  if (!publication) throw new Error("There is no publication with that ID");

  return publication;
};