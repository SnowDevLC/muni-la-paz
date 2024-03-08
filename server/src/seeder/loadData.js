const fs = require('fs');
const path = require('path');

const loadData = async (User, Publication, Complex) => {
  try {
    const seeder = fs.readFileSync(path.resolve(__dirname, 'seeder.json'), 'utf-8');
    const { users, publications, complexes } = JSON.parse(seeder);

    await User.bulkCreate(users);
    await Publication.bulkCreate(publications);
    await Complex.bulkCreate(complexes);

    console.log('Datos cargados correctamente.');
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
};

module.exports = { loadData };