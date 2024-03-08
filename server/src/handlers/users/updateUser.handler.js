const { updateUserController } = require('../../controllers');

module.exports = async (req, res) => {
  try {
    await updateUserController(req.body, req.user.id, req.params.id);

    return res.status(200).json({ message: 'Update Complete' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error' });
  }
};