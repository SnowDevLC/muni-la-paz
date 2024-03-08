const { User } = require('../../db/connection');

module.exports = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error('El usuario no existe');
  }

  await User.destroy({ where: { id } });

  return;
};