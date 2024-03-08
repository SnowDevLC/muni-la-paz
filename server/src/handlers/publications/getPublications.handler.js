const {getPublicationsController} = require('../../controllers');

module.exports = async (req, res) => {
  try {
    const allPublications = await getPublicationsController();
    res.status(200).json(allPublications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};