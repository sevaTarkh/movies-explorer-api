const router = require('express').Router();
const {
  getMovieInfo,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  postMovieValidation,
  deleteMovieValidation,
} = require('../utils/validation');

router.get('/', getMovieInfo);
router.post('/', postMovieValidation, postMovie);
router.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
