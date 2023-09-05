const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  BAD_REQUEST_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  VALIDATION_ERROR,
  CAST_ERROR,
  FILM_DELETED,
} = require('../utils/constants');

module.exports.getMovieInfo = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movie) => {
      res.send(movie);
    })
    .catch(() => {
      throw new NotFoundError(NOT_FOUND_ERROR);
    })
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const { _id: userId } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: userId,
  })
    .then((movie) => res.status(201).send({
      _id: movie._id,
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
    }))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR || err.name === CAST_ERROR) {
        next(new BadRequestError(BAD_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id: userId } = req.user;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_ERROR);
      }
      const { owner: ownerId } = movie;

      if (ownerId.valueOf() !== userId) {
        throw new ForbiddenError(FORBIDDEN_ERROR);
      }
      return Movie.findByIdAndRemove(movieId)
        .then(() => res.send({
          message: FILM_DELETED,
        }));
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR || err.name === CAST_ERROR) {
        next(new BadRequestError(BAD_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};
