var express   = require('express');
var router    = express.Router();
var functions = require('../Functions');

var text = 'ServerUp'
var img;
var buzzwords;
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

// GET 5 BUZZWORDS OF THE DAY
router.get('/api/wordbank', function(req, res) {
  buzzwords = functions.generateWords();
  console.log(buzzwords);
});

router.get('/api/get_score', function(req, res){
  var img_url = req.query.url;
  console.log(img_url);
  if (!buzzwords) console.error("No Buzzwords generated yet!");
  else {
    const score = functions.getScore(img_url, buzzwords);
    console.log(score);
  }
});

module.exports = router;
