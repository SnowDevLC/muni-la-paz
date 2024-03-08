const { Complex } = require('../../db/connection');

const fs = require('fs/promises');
const path = require('path');

module.exports = async (id) => {
  const complex = await Complex.findByPk(id);

  if (!complex) {
    throw new Error('El complejo no existe');
  }

  const imagePath = path.join(__dirname, '../../../public/images/complexes', String(id));
  await fs.rm(imagePath, { recursive: true, force: true });

  await Complex.destroy({ where: { id } });

  return;
};