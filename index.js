module.exports = process.env.IMDB_COV
  ? require('./lib-cov/imdb')
  : require('./lib/imdb');
