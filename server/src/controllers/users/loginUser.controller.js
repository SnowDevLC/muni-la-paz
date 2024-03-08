const { User } = require('../../db/connection');
const { comparePassword } = require('../../middlewares/auth/auth');
const { generateToken } = require('../../middlewares/jwt/jwt');

module.exports = async (data) => {
    const { email, password } = data;
    try {
        const user = await User.findOne({ where: { email } });
    
        if (!user) throw ({ statusCode: 402,message: 'Email o Contraseña Incorrectos' });
    
        const isMatchPassword = await comparePassword(password, user.password);
        if (!isMatchPassword) throw ({ statusCode: 402,message: 'Email o Contraseña Incorrectos' });
    
        if(!user.active) throw ({ statusCode: 405, message: 'Usuario Desactivado, pida Autorización' });
        
        const token = generateToken(user.id, user.email, user.name, user.rol, user.passwordChanged);
        
        return token;
        
    } catch (error) {
        throw error;
    }
};