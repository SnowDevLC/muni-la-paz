const {getComplexesByNameController} = require('../../controllers');

module.exports = async (req, res) => {
  try {
    const complexes = await getComplexesByNameController(req.query.name);
    res.status(200).json(complexes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};