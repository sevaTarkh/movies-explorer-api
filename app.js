require('dotenv').config();

const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const limiter = require('./middlewares/ratelimitter');
const router = require('./routes/index');
const { errorLogger, requestLogger } = require('./middlewares/logger');

const {
  MONGOBD_ADRESS,
  CORS_ADRESS,
} = require('./utils/constants');

const handleError = require('./middlewares/handleerror');

const { PORT } = process.env;

const app = express();

app.use(cors({ origin: CORS_ADRESS, credentials: true }));
app.use(helmet());

mongoose.connect(MONGOBD_ADRESS, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT);
