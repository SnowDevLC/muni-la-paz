const { User } = require('../../db/connection');
const { hashPassword } = require('../../middlewares/auth/auth');

module.exports = async (user) => {
    const { name, email, rol } = user;
    const password = await hashPassword(email);

    const findUser = await User.findOne({where: {email}});
    if (findUser) throw new Error (`User with email ${email} already exists`);

    const newUser = await User.create({ name, email, rol, password });

    return newUser;
};