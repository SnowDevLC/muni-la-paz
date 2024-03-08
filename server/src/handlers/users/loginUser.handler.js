const { loginUserController } = require('../../controllers');

module.exports = async (req, res) => {
  try {
    const user = await loginUserController(req.body);
    res.setHeader('Authorization', user.token);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ statusCode: error.statusCode, message: error.message });
  }
};