const { createUserController } = require('../../controllers');

module.exports = async (req, res) => {
  try {
    const newUser = await createUserController(req.body);

    return res.status(200).json({ message: 'Created User' });
  } catch (error) {
    return res.status(500).json({ message: 'Error' });
  }
};