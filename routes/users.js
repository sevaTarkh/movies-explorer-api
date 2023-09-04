const router = require('express').Router();
const { getUserInfo, setUserInfo } = require('../controllers/users');

const { setUserValidation } = require('../utils/validation');

router.get('/me', getUserInfo);
router.patch('/me', setUserValidation, setUserInfo);

module.exports = router;
