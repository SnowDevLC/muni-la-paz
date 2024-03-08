const { Publication } = require('../../db/connection');

const fs = require('fs/promises')
const path = require('path');

module.exports = async (data, files, id) => {

  if (files && files.length > 0) {
    
    const folderImgPath = path.join(__dirname, '../../../public/images/publications', String(id));

    const folderExists = await fs.access(folderImgPath).then(()=>true).catch(()=>false);
  
    if (folderExists){
      await fs.rmdir(folderImgPath, {recursive: true});
    }
    
    const paths = [];
    for (const image of files) {
      let newPath = `./public/images/publications/${id}/${Date.now()}-${image.originalname}`;
  
      await fs.mkdir(path.dirname(newPath), { recursive: true });
  
      await fs.rename(image.path, newPath);
  
      newPath = newPath.substring(1);
      paths.push(newPath);
    }
    data.images = paths;
  }

  await Publication.update(data, { where: { id } });

  return;
};