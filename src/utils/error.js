class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  let { statusCode } = err;
  if (!statusCode) statusCode = 500;

  res.status(statusCode).json({
    status: 'Error',
    statusCode,
    message: err.message,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
