const {getAllComplexesController} = require('../../controllers');

module.exports = async (req, res) => {
  try {
    const allComplexes = await getAllComplexesController();
    res.status(200).json(allComplexes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};