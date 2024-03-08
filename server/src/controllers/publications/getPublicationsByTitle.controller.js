const { Publication } = require("../../db/connection");
const { Op } = require("sequelize");

module.exports = async (title) => {
  const publication = await Publication.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`,
      },
    },
    order: [['date', 'DESC']],
  });

  if (publication.length === 0) throw new Error('There is no publication with that name');

  return publication;
};