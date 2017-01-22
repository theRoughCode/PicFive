var express = require('express');
var router = express.Router();
var score = require('../app/models/score');
var functions = require('../Functions');
var models    = require('../Models');
var Promise   = require('bluebird');
var cool      = require('cool-ascii-faces');
var jimp     = require('jimp');
var bodyParser = require('body-parser');

var buzzwords = ['CAR', 'BANANA', 'WATER', 'ICE', 'TREE'];
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
  [10,'user',0]
];
var points = 0;
//GET homepage
router.get('/', function(req, res) {
    if(!buzzwords) buzzwords = functions.generateWords();
    console.log(buzzwords);
    res.render('index', {
      words: buzzwords
    });
    console.log('GET - homepage');
});

//receive image
// img, user
router.post('/img', function(req, res) {
    var img;
    if (req.query.img) img = req.query.img;
    else img = functions.base64(req.files.imgUp.data);
    var scorePromise = functions.getScore(img, buzzwords);

    var usern = req.query.user || req.body.user;
    if (usern == '') usern ='apparently has no name';

    //do function calls to get the player's score
    var player = new score({
      name : usern
    });
    scorePromise.then(result => {
      console.log(result);
      points = result;
    }, err => console.error(err))
    .then(function(list, err) {
      if (err) return console.error(err);
      player.val = points;
      player.save(function (points, err) {
        if (err) console.log(err);
        console.log("Player " + player.name + ' saved!');
      });
      query.exec(function(err, scores) {
        if (err) return console.error(err);
        for(var i = 0; i < scores.length; i++) {
          // edit res to send leaderboard to client
          board[i][1] = scores[i].name;
          board[i][2] = scores[i].val;
        }
        res.redirect('/views/leaderboards');
      })
    })
});

router.get('/views/leaderboards', function(req, res) {
    res.render('leaderboards', {
        mainscore : points,
        user: board
    })
});

// GET 5 BUZZWORDS OF THE DAY
router.get('/api/wordbank', function(req, res) {
  buzzwords = functions.generateWords();
  res.redirect('/');
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
