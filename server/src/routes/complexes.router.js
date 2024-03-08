const { Router } = require('express');
const router = Router();
const { verifyToken } = require('../middlewares/jwt/jwt');
const { getAllComplexesHandler, postComplexHandler, getComplexesByNameHandler, getComplexByIdHandler, updateComplexHandler, deleteComplexHandler } = require('../handlers');
const upload = require('../middlewares/upload/upload');

router.get('/', getAllComplexesHandler);
router.get('/name', getComplexesByNameHandler);
router.get('/:id', getComplexByIdHandler);
router.post('/', verifyToken, upload, postComplexHandler);
router.patch('/:id', verifyToken, upload, updateComplexHandler);
router.delete('/:id', verifyToken, deleteComplexHandler);

module.exports = router;