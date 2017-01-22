var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var tagSchema = mongoose.Schema({
        tags: [{type: String}]
});

module.exports = mongoose.model('tag', tagSchema);
