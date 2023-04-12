const errorHandler = (error, req, res, next) => {
  let statusCode = error.StatusCode|| 500;
  let message = error.Message || 'Internal Server error';
  return res.status(statusCode).json({
    StatusCodes: statusCode,
    Message: message
  });
};

module.exports = errorHandler;