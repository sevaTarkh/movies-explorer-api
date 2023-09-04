const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const { URL_ERROR } = require('../utils/constants');
const { URL_REGEX } = require('../utils/validation');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (image) => URL_REGEX.test(image),
      message: URL_ERROR,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (trailerLink) => URL_REGEX.test(trailerLink),
      message: URL_ERROR,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (thumbnail) => URL_REGEX.test(thumbnail),
      message: URL_ERROR,
    },
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
