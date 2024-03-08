const { User } = require('../../db/connection');

module.exports = async () => {
    const users = await User.findAll({ order: [['id', 'ASC']] });
    return users;
};