//COMPLEXES CONTROLLERS
const getAllComplexesController = require('./complexes/getAllComplexes.controller');
const postComplexController = require('./complexes/postComplex.controller');
const getComplexesByNameController = require('./complexes/getComplexesByName.controller');
const getComplexByIdController = require('./complexes/getComplexById.controller');
const updateComplexController = require('./complexes/updateComplex.controller');
const deleteComplexController = require('./complexes/deleteComplex.controller');

//PUBLICATIONS CONTROLLERS
const getPublicationsController = require('./publications/getPublications.controller');
const getPublicationsByTitleController = require('./publications/getPublicationsByTitle.controller');
const getPublicationByIdController = require('./publications/getPublicationById.controller');
const postPublicationController = require('./publications/postPublication.controller');
const updatePublicationController = require('./publications/updatePublication.controller');
const deletePublicationController = require('./publications/deletePublication.controller');

//USERS CONTROLLERS
const getUsersController = require('./users/getUsers.controller');
const createUserController = require('./users/createUser.controller');
const loginUserController = require('./users/loginUser.controller');
const updateUserController = require('./users/updateUser.controller');
const getUsersByNameController = require('./users/getUsersByName.controller');
const deleteUserController = require('./users/deleteUser.controller');


module.exports = {
  getAllComplexesController,
  postComplexController,
  getComplexesByNameController,
  getComplexByIdController,
  updateComplexController,
  deleteComplexController,
  getPublicationsController,
  getPublicationsByTitleController,
  getPublicationByIdController,
  postPublicationController,
  updatePublicationController,
  deletePublicationController,
  getUsersController,
  createUserController,
  loginUserController,
  updateUserController,
  getUsersByNameController,
  deleteUserController
};