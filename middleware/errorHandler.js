// Central error middleware. Every error in the application, whether
// thrown explicitly with ApiError or surfaced by Mongoose validation,
// ends up here and is returned to the client in one consistent format.
// Express recognizes this as error-handling middleware specifically
// because it takes four parameters.
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose validation errors (e.g. missing required field, bad type)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // Mongoose bad ObjectId (e.g. malformed id in the URL)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for ${err.path}: ${err.value}`;
  }

  res.status(statusCode).json({
    error: {
      status: statusCode,
      message,
    },
  });
};

module.exports = errorHandler;
