const { Complex } = require("../../db/connection");
const { Op } = require("sequelize");

module.exports = async (name) => {
  const complexes = await Complex.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    order: [['id', 'DESC']],
  });

  if (complexes.length === 0) throw new Error('There is no complexes with that name');

  return complexes;
};