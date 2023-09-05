const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { EMAIL_REGEX } = require('../utils/validation');
const { EMAIL_ERROR, PASSWORD_PLUS, WRONG_EMAIL_OR_PASS } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => EMAIL_REGEX.test(email),
      message: EMAIL_ERROR,
    },
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select(PASSWORD_PLUS)
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(WRONG_EMAIL_OR_PASS));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(WRONG_EMAIL_OR_PASS));
          }

          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
