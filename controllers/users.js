const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const AuthError = require('../errors/AuthError');

const {
  BAD_REQUEST_ERROR,
  AUTH_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  VALIDATION_ERROR,
  CAST_ERROR,
} = require('../utils/constants');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_ERROR);
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError(BAD_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};

module.exports.setUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const { _id: id } = req.user;
  User.findByIdAndUpdate(
    id,
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_ERROR);
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERROR));
      } else if (err.name === VALIDATION_ERROR || err.name === CAST_ERROR) {
        next(new BadRequestError(BAD_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};
module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      throw new AuthError(AUTH_ERROR);
    })
    .catch(next);
};
module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        name: user.name,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERROR));
      } else if (err.name === VALIDATION_ERROR || err.name === CAST_ERROR) {
        next(new BadRequestError(BAD_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};
