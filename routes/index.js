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
var winner = ['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'];
var winner_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var points = 0;
//GET homepage
router.get('/', function(req, res) {
    var buzzwords = functions.generateWords();
    console.log(buzzwords);
    res.render('index', {
      words: buzzwords
    });
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
    var scorePromise = functions.getScore(img, buzzwords);
    points = scorePromise;
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
        player.save(function (points, err) {
            if (err) console.log(err);
            console.log('Saved: ', points);
        });
        if (err) return console.error(err);
        query.exec(function(err, scores) {
            if (err) return console.error(err);
            scores.forEach(function(scoreA, winner_score, score) {
                // edit res to send leaderboard to client
                winner_score = scoreA.name;
                score = scoreA.val;
                console.log(scoreA.name);
                console.log(scoreA.val);
            })
            res.redirect('/views/leaderboards');
        })
    })
});

router.get('/views/leaderboards', function(req, res) {
    res.render('leaderboards', {
        mainscore : points,
        winner1 : score[0],
        winner2 : score[1],
        winner3 : score[2],
        winner4 : score[3],
        winner5 : score[4],
        winner6 : score[5],
        winner7 : score[6],
        winner8 : score[7],
        winner9 : score[8],
        winner10 : score[9],
        score1 : winner_score[0],
        score2 : winner_score[1],
        score3 : winner_score[2],
        score4 : winner_score[3],
        score5 : winner_score[4],
        score6 : winner_score[5],
        score7 : winner_score[6],
        score8 : winner_score[7],
        score9 : winner_score[8],
        score10 : winner_score[9]
    })
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
