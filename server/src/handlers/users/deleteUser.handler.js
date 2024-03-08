const { deleteUserController } = require('../../controllers');

module.exports = async (req, res) => {
  try {
    await deleteUserController(req.params.id);

    return res.status(200).json({ message: 'Delete Complete' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error' });
  }
};