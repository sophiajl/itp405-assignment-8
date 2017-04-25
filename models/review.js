var bookshelf = require('./../bookshelf');
var Book = require('./book');

var Review = bookshelf.Model.extend({
    tableName: 'reviews'

});

module.exports = Review;