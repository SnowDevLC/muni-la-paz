const {Router} = require("express");
const mainRouter = Router();

const usersRouter = require('./users.router');
const complexesRouter = require('./complexes.router');
const publicationsRouter = require('./publications.router');

mainRouter.use('/users', usersRouter);
mainRouter.use('/complexes', complexesRouter);
mainRouter.use('/publications', publicationsRouter);

module.exports = mainRouter;