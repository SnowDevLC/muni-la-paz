const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (id, email, name, rol, passwordChanged) => {
  const payload = { id, email, name};
  const options = { expiresIn: '360m' };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  if (!passwordChanged) {
    return { token, id, name, passwordChanged };
  }
  if (rol === 'Admin' || rol === 'superAdmin' && passwordChanged) {
    return { token, id, name, rol };
  }
  return {token, id, name};
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { generateToken, verifyToken };
