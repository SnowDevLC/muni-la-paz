const { Publication } = require('../../db/connection');

const fs = require('fs/promises');
const path = require('path');

module.exports = async (id) => {
  const publication = await Publication.findByPk(id);

  if (!publication) {
    throw new Error('La publicación no existe');
  }

  const imagePath = path.join(__dirname, '../../../public/images/publications', String(id));
  await fs.rm(imagePath, { recursive: true, force: true });

  await Publication.destroy({ where: { id } });

  return;
};