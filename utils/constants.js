const MONGOBD_ADRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb';

const CORS_ADRESS = [
  'http://localhost:4000',
  'https://kino.nomoredomainsicu.ru',
  'https://api.kino.nomoredomainsicu.ru',
];

const NOT_FOUND_ERROR = 'Произошла ошибка: Not Found';
const AUTH_ERROR = 'Произошла ошибка: Auth Error';
const BAD_REQUEST_ERROR = 'Произошла ошибка: Bad Request';
const CONFLICT_ERROR = 'Произошла ошибка: User with this email already exists';
const FORBIDDEN_ERROR = 'Произошла ошибка: Its not your movie';
const SERVER_ERROR = 'Произошла ошибка: Ошибка сервера';
const REQUEST_LOG = 'request.log';
const ERROR_LOG = 'error.log';
const VALIDATION_ERROR = 'ValidationError';
const CAST_ERROR = 'CastError';
const FILM_DELETED = 'Фильм удален';
const URL_ERROR = 'Введите корректную ссылку';
const EMAIL_ERROR = 'Введите корректный email';
const PASSWORD_PLUS = '+password';
const WRONG_EMAIL_OR_PASS = 'Неправильные почта или пароль';

module.exports = {
  MONGOBD_ADRESS,
  CORS_ADRESS,
  NOT_FOUND_ERROR,
  AUTH_ERROR,
  BAD_REQUEST_ERROR,
  CONFLICT_ERROR,
  FORBIDDEN_ERROR,
  SERVER_ERROR,
  REQUEST_LOG,
  ERROR_LOG,
  VALIDATION_ERROR,
  CAST_ERROR,
  FILM_DELETED,
  URL_ERROR,
  EMAIL_ERROR,
  PASSWORD_PLUS,
  WRONG_EMAIL_OR_PASS,
};
