const {getUsersByNameController} = require('../../controllers');

module.exports = async (req, res) => {
  try {
    const users = await getUsersByNameController(req.query.name);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};