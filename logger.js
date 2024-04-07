exports.error = (next, message, status = 500) => {
  const error = new Error(message);
  error.status = status;
  next(error);
};
exports.log = (data, type) => {
  const log = console.log('\x1b[37m → \x1b[32m' + type.toUpperCase() + '\x1b[37m -\x1b[0m', data);
  next(log);
};

