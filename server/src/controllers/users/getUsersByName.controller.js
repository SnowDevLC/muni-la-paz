const { User } = require("../../db/connection");
const { Op } = require("sequelize");

module.exports = async (name) => {
  const users = await User.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    order: [['id', 'ASC']],
  });

  if (users.length === 0) throw new Error('There is no users with that name');

  return users;
};