var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scoreSchema = mongoose.Schema({
    name        : String,
    val         : Number
});




module.exports = mongoose.model('score', scoreSchema);
