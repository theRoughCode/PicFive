var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = mongoose.Schema({
        tag1        : String,
        tag2        : String,
        tag3        : String,
        tag4        : String,
        tag5        : String
});

module.exports = mongoose.model('tag', tagSchema);
