var imdb = require('../lib/imdb');

imdb('http://www.imdb.com/title/tt0096895/', function(resultData) {
    console.log(resultData);
});