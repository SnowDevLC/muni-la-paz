const { hashPassword } = require('../../middlewares/auth/auth');
const { User } = require('../../db/connection');

module.exports = async (data, id, paramsId) => {

    if (data.updatePassword) {
        data = { ...data, 
            passwordChanged: true, 
            password: await hashPassword(data.password) 
        };
        await User.update(data, { where: { id } });
    } else {
        await User.update(data, { where: { id: paramsId } });
    }

    return;
};