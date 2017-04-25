require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var Review = require('./models/review');
var Book = require('./models/book');
var Publisher = require('./models/publisher');
var SongsCollection = require('./collections/song');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());


app.get('/api/v1/reviews', function(request, response) {
  Review.fetchAll().then(function(reviews) {
    response.json(reviews);
  });
});

  // eager load
  // new SongsCollection().fetch({ withRelated: ['artist'] }).then(function(songs) {
  //   response.json(songs);
  // });

// lazy load
// app.get('/api/songs', function(request, response) {
//   Song
//     .fetchAll()
//     .then(function(songs) {
//       var artists = songs.map(function(song) {
//         return song.related('artist').fetch();
//       });

//       return Promise.all(artists);
//     })
//     .then(function(artists) {
//       response.json(artists);
//     });
// });
//
app.get('/api/v1/books/:id', function(request, response) {
  Book
    .where('id', request.params.id)
    .fetch({
      require: true,
      withRelated: ['publisher', 'author']
    })
    .then(function(book) {
      response.json(book);
    }, function() {
      response.json({
        error: 'Book not found'
      });
    });
});

app.post('/api/v1/reviews', function(request, response) {
  var review = new Review({
    book_id: request.body.book_id,
    headline: request.body.headline,
    body: request.body.body,
    rating: request.body.rating
  });

  review.save().then(function() {
    response.json(review);
  });
});

//
// app.delete('/api/artists/:id', function(request, response) {
//   var artist = new Artist({
//     id: request.params.id
//   });
//
//   artist
//     .destroy({ require: true })
//     .then(function(artist) {
//       response.json(artist);
//     }, function() {
//       response.status(404).json({
//         error: 'song not found'
//       });
//     });
// });
//
// app.put('/api/artists/:id', function(request, response) {
//   Artist
//     .where('id', request.params.id)
//     .fetch({ require: true })
//     .then(function(artist) {
//       artist.set('artist_name', request.body.name);
//       return artist.save();
//     }, function(e) {
//       response.status(404).json({
//         error: {
//           message: 'artist not found'
//         }
//       });
//     })
//     .then(function(artist) {
//       response.json(artist);
//     });
// });

app.listen(8000);
