const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUserInfo, setUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().pattern(/.+@.+\..+/),
  }),
}), setUserInfo);

module.exports = router;
