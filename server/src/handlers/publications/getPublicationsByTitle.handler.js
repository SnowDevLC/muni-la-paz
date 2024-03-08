const {getPublicationsByTitleController} = require('../../controllers');

module.exports = async (req, res) => {
  try {
    const publications = await getPublicationsByTitleController(req.query.title);
    res.status(200).json(publications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};