var express = require('express');
var router = express.Router();
var score = require('../app/models/score');
var functions = require('../Functions');
var models    = require('../Models');
var Promise   = require('bluebird');
var cool      = require('cool-ascii-faces');

var buzzwords = ['car', 'banana', 'water', 'ice', 'tree'];
//the query we will make on the database (max 50 players, sort largest > smallest)
var query = score.find().sort({val: -1}).limit(50);
//GET homepage
router.get('/', function(req, res) {
    res.render('index');
    console.log('GET - homepage');
});

router.get('/leaderboards', function(req, res) {
  res.render('leaderboards', {
    mainscore : 500
  });
});

//receive image
router.post('/img', function(req, res) {
    var img = functions.base64(req.files.imgUp.data);

    //do function calls to get the player's score
    var points;
    var scorePromise = functions.getScore(img, buzzwords);
    var player = new score({
        name : 'username',
        val : points
    });
    scorePromise.then(result => {
      points = result;
      console.log(points);
    }, err => console.error(err))
    .then(function(err, list) {
        if (err) return console.error(err);
        player.val = points;
        player.save(function (err, data) {
            if (err) console.log(err);
            console.log('Saved: ', data);
        }).then(function(err, list) {
            if (err) return console.error(err);
            query.exec(function(err, scores) {
                if (err) return console.error(err);
                scores.forEach(function(scoreA) {
                    // edit res to send leaderboard to client
                    console.log(scoreA.name);
                    console.log(scoreA.val);
                })
            })
        })
    });
    //res.render leaderboard page
    res.render('index');

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
    var points;
    var scorePromise = functions.getScore(img_url, buzzwords);
    scorePromise.then(result => {
      points = result;
    }, err => console.error(err));
  }
});

router.get('/cool', function(request, response) {
  response.send(cool());
})

module.exports = router;
