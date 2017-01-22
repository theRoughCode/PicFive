var express = require('express');
var router = express.Router();
var score = require('../app/models/score');
var functions = require('../Functions');
var models    = require('../Models');
var Promise   = require('bluebird');
var cool      = require('cool-ascii-faces');

var buzzwords = ['car', 'banana', 'water', 'ice', 'tree'];
//the query we will make on the database (max 50 players, sort largest > smallest)
var query = score.find().sort({val: -1}).limit(10);
var board = [
  [1,'user',0],
  [2,'user',0],
  [3,'user',0],
  [4,'user',0],
  [5,'user',0],
  [6,'user',0],
  [7,'user',0],
  [8,'user',0],
  [9,'user',0],
  [10,'user',0],
];
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
    mainscore : 500,
    user: board
  });
});

//receive image
router.post('/img', function(req, res) {
    var img = functions.base64(req.files.imgUp.data);
    var usern = req.body.user;
    if (usern == '') usern ='apparently has no name';

    //do function calls to get the player's score
    var scorePromise = functions.getScore(img, buzzwords);
    points = scorePromise;
    var player = new score({
        name : usern,
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
            for(var i = 0; i < scores.length; i++) {
                // edit res to send leaderboard to client
                board[1][i] = scores[i].name;
                board[2][i] = scores[i].val;
                console.log(scores[i].name);
                console.log(scores[i].val);
            }
            res.redirect('/views/leaderboards');
        })
    })
});

router.get('/views/leaderboards', function(req, res) {
    res.render('leaderboards', {
        mainscore : points,
        winner1 : board[1][0],
        winner2 : board[1][1],
        winner3 : board[1][2],
        winner4 : board[1][3],
        winner5 : board[1][4],
        winner6 : board[1][5],
        winner7 : board[1][6],
        winner8 : board[1][7],
        winner9 : board[1][8],
        winner10 : board[1][9],
        score1 : board[2][0],
        score2 : board[2][1],
        score3 : board[2][2],
        score4 : board[2][3],
        score5 : board[2][4],
        score6 : board[2][5],
        score7 : board[2][6],
        score8 : board[2][7],
        score9 : board[2][8],
        score10 : board[2][9]
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
