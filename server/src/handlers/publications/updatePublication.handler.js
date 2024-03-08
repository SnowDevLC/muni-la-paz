const { updatePublicationController } = require('../../controllers');

module.exports = async (req, res) => {
  try {
    await updatePublicationController(req.body, req.files, req.params.id);

    return res.status(200).json({ message: 'Update Complete' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error' });
  }
};