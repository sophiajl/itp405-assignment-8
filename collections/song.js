var bookshelf = require('./../bookshelf');
var Song = require('./../models/author');

module.exports = bookshelf.Collection.extend({
  model: Song
});