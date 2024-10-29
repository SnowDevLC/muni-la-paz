const { postPublicationController } = require('../../controllers');

module.exports = async (req, res) => {
  try {
    const postPublication = await postPublicationController(req.body, req.files, req.user.id);
    res.status(200).json(postPublication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};