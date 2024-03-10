const {getPublicationByIdController} = require('../../controllers');

module.exports = async (req, res) => {
  try {
    const publication = await getPublicationByIdController(req.params.title);
    res.status(200).json(publication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};