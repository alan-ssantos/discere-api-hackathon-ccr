const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const routes = require('./api');
const config = require('./config');
const { handleError, ErrorHandler } = require('./utils/error');

const app = express();

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: true,
};

mongoose.connect(config.databaseURL, options)
  .then((c) => {
    console.log(`Database is connected: ${c.connection.name}`);
  })
  .catch((err) => {
    console.log(`Database connection error: ${err}`);
  });

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('tiny'));
app.use(routes());

app.use((req, res, next) => {
  const error = new ErrorHandler(404, 'Not Found!');
  return next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
});

app.listen(config.port, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
    return;
  }
  console.log(`
    ------------------------------------
       Server listening on port: ${config.port}
    ------------------------------------
    `);
});
