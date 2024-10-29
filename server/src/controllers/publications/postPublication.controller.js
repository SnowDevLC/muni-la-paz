const { Publication, User } = require("../../db/connection");

const fs = require('fs/promises')
const path = require('path');

module.exports = async (body, files, id) => {

  console.log("ENTRO AL CONTROLLER")

  const newPublication = await Publication.create(body);

  console.log("CREO LA PUBLICACION SIN IMAGENES:", newPublication)

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

  console.log("AGREGO LAS IMAGES A LA PUBLICAICON")

  const associatedUser = await User.findOne({ where: { id } })
  await newPublication.setUser(associatedUser);

  console.log("ASOCIO LA PUBLICACION AL USUARIO Y RETORNO LA PUBLICACION CREADA")

  return newPublication;
};