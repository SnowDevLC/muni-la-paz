const {getComplexByIdController} = require('../../controllers');

module.exports = async (req, res) => {
  try {
    const complexes = await getComplexByIdController(req.params.name);
    res.status(200).json(complexes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};