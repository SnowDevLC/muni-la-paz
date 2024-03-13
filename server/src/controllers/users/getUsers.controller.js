const { User } = require('../../db/connection');

module.exports = async () => {
    const users = await User.findAll({ order: [['id', 'ASC']] });
    const usersOutSuperAdmin = users.filter((user) => user.rol !== 'superAdmin');
    return usersOutSuperAdmin;
};