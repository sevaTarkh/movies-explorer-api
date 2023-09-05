const router = require('express').Router();

const NotFoundError = require('../errors/NotFoundError');
const routerUser = require('./users');
const routerMovie = require('./movies');
const routerSignIn = require('./signin');
const routerSignUp = require('./signup');
const auth = require('../middlewares/auth');

const {
  NOT_FOUND_ERROR,
} = require('../utils/constants');

router.use('/', routerSignUp);
router.use('/', routerSignIn);

router.use(auth);
router.use('/users', routerUser);
router.use('/movies', routerMovie);

router.use((req, res, next) => next(new NotFoundError(NOT_FOUND_ERROR)));

module.exports = router;
