const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  let messagesList;

  console.log(err.stack);

  //Mongoose bad ObjectId
  if(err.name === 'CastError') {
    const message = `Resource not found with ${err.value} data!`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose duplicate key
  if(err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400);
  }

  //Mongoose validation errors
  if(err.name === 'ValidationError') {
    messagesList = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(messagesList, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: messagesList || error.message || err.message || 'Server error'
  });
}

module.exports = errorHandler;
