//COMPLEXES HANDLERS
const getAllComplexesHandler = require('./complexes/getAllComplexes.handler');
const postComplexHandler = require('./complexes/postComplex.handler');
const getComplexesByNameHandler = require('./complexes/getComplexesByName.handler');
const getComplexByIdHandler = require('./complexes/getComplexById.handler');
const updateComplexHandler = require ('./complexes/updateComplex.handler');
const deleteComplexHandler = require ('./complexes/deleteComplex.handler');

//PUBLICATIONS HANDLERS
const getPublicationsHandler = require('./publications/getPublications.handler');
const getPublicationsByTitleHandler = require('./publications/getPublicationsByTitle.handler');
const getPublicationByIdHandler = require('./publications/getPublicationById.handler');
const postPublicationHandler = require('./publications/postPublication.handler');
const updatePublicationHandler = require('./publications/updatePublication.handler');
const deletePublicationHandler = require('./publications/deletePublication.handler');

//USERS HANDLERS
const getUsersHandler = require('./users/getUsers.handler');
const createUserHandler = require('./users/createUser.handler');
const loginUserHandler = require('./users/loginUser.handler');
const updateUserHandler = require('./users/updateUser.handler');
const getUsersByNameHandler = require('./users/getUsersByName.handler');
const deleteUserHandler = require('./users/deleteUser.handler');

module.exports = {
  getAllComplexesHandler,
  postComplexHandler,
  getComplexesByNameHandler,
  getComplexByIdHandler,
  updateComplexHandler,
  deleteComplexHandler,
  getPublicationsHandler,
  getPublicationsByTitleHandler,
  getPublicationByIdHandler,
  postPublicationHandler,
  updatePublicationHandler,
  deletePublicationHandler,
  getUsersHandler,
  createUserHandler,
  loginUserHandler,
  updateUserHandler,
  getUsersByNameHandler,
  deleteUserHandler
}