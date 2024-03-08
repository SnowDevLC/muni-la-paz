const { Publication, User } = require("../../db/connection");

const fs = require('fs/promises')
const path = require('path');

module.exports = async (body, files, id) => {
  const newPublication = await Publication.create(body);

  if (files) {
    const paths = [];

    for (const image of files) {
      let newPath = `./public/images/publications/${newPublication.id}/${Date.now()}-${image.originalname}`;
  
      await fs.mkdir(path.dirname(newPath), { recursive: true });
  
      await fs.rename(image.path, newPath);
  
      newPath = newPath.substring(1);
      paths.push(newPath);
    }

    await newPublication.update({ images: paths });
  }

  const associatedUser = await User.findOne({ where: { id } })
  await newPublication.setUser(associatedUser);

  return newPublication;
};