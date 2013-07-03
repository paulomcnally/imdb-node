## imdb-node ##

#### Install
    npm install imdb-node

#### Example

    var imdb = require('imdb-node');

    imdb('http://www.imdb.com/title/tt0096895/', function(resultData) {
        console.log(resultData);
    });

#### resultData
    {
        id: 'tt0096895',
        title: 'Batman',
        duration: '126 min',
        classification: 'PG-13',
        genres: [
            'Action',
            'Fantasy'
        ],
        rating: '7.6',
        img: 'http://ia.media-imdb.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX214_.jpg',
        description: 'The Dark Knight of Gotham City begins his war on crime with his first major enemy being the clownishly homicidal Joker.',
        director: 'Tim Burton',
        creator: [
            'Bob Kane',
            'Sam Hamm'
        ],
        actors: [
            'Michael Keaton',
            'Jack Nicholson',
            'Kim Basinger'
        ]
    }

#### version 0.0.4
-  id addeded to resultData

#### version 0.0.3
-  Fix path jquery.min.js (solved)

#### version 0.0.2
- Fix path jquery.min.js

#### version 0.0.1
- First version

Last update: 2013-07-03
