const { Router } = require('express');
const router = Router();
const {verifyToken} = require('../middlewares/jwt/jwt');
const {getUsersHandler, getUsersByNameHandler, updateUserHandler, createUserHandler, loginUserHandler, deleteUserHandler} = require('../handlers');

router.get('/', verifyToken, getUsersHandler);
router.get('/name', verifyToken, getUsersByNameHandler);
router.patch('/:id', verifyToken, updateUserHandler);
router.patch('/', verifyToken, updateUserHandler);
router.post('/', verifyToken, createUserHandler);
router.post('/login', loginUserHandler);
router.delete('/:id', verifyToken, deleteUserHandler);

module.exports = router;