// A small custom error class that carries an HTTP status code alongside
// the message. Controllers throw/pass these to next(), and the central
// error middleware reads the statusCode off of them to build a
// consistent response.
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ApiError;
