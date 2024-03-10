const { Router } = require('express');
const router = Router();
const { verifyToken } = require('../middlewares/jwt/jwt');
const upload = require('../middlewares/upload/upload');
const { getPublicationsHandler, postPublicationHandler, getPublicationsByTitleHandler, getPublicationByIdHandler, updatePublicationHandler, deletePublicationHandler } = require('../handlers');

router.get('/', getPublicationsHandler);
router.get('/title', getPublicationsByTitleHandler);
router.get('/:title', getPublicationByIdHandler);
router.post('/', verifyToken, upload, postPublicationHandler);
router.patch('/:id', verifyToken, upload, updatePublicationHandler);
router.delete('/:id', verifyToken, deletePublicationHandler);

module.exports = router;