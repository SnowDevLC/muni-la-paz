const { Complex, User } = require("../../db/connection");

const fs = require('fs/promises')
const path = require('path');

module.exports = async (body, files, id) => {
  const newComplex = await Complex.create(body);

  if (files) {
    const paths = [];

    for (const image of files) {
      let newPath = `./public/images/complexes/${newComplex.id}/${Date.now()}-${image.originalname}`;
  
      await fs.mkdir(path.dirname(newPath), { recursive: true });
  
      await fs.rename(image.path, newPath);
  
      newPath = newPath.substring(1);
      paths.push(newPath);
    }

    await newComplex.update({ images: paths });
  }

  const associatedUser = await User.findOne({where: {id}})
  await newComplex.setUser(associatedUser);
  
  return newComplex;
};