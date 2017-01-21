var express = require('express');
var router = express.Router();

var text = 'ServerUp'
var img;
//GET homepage
router.get('/', function(req, res) {
    res.render('index', {
        title: text
    });
    console.log('GET - homepage')
});


//receive image
router.post('/img', function(req, res) {
    img = req.body.img
    console.log('POST - text');
    //10 function calls to get a score
    console.log(img);
    //res.render(something with a leaderboard/score/whatever thing)
});

module.exports = router;
