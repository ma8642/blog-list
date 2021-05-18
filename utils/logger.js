const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

module.exports = {
  info, // for printing normal log messages
  error, // for all error messages
};
