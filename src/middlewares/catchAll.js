const createError = require('http-errors');

module.exports = async (req, res, next) => {
  next(createError(404));
};
