const router = require('express').Router();
const {
  loginUser,
} = require('../controllers/users');

const { loginUserValidation } = require('../utils/validation');

router.post('/signin', loginUserValidation, loginUser);

module.exports = router;
