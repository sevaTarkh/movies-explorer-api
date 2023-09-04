const router = require('express').Router();
const {
  createUser,
} = require('../controllers/users');

const { registerUserValidation } = require('../utils/validation');

router.post('/signup', registerUserValidation, createUser);

module.exports = router;
