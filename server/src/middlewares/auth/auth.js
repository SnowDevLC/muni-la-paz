const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}

async function comparePassword(passwordBody, passwordUser) {
  try {
    return await bcrypt.compare(passwordBody, passwordUser);
  } catch (error) {
    throw new Error('Password incorrect');
  }
}

module.exports = { hashPassword, comparePassword };
