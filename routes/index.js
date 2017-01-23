var express     = require('express');
var router      = express.Router();
var score       = require('../app/models/score');
var functions   = require('../Functions');
var tag         = require('../app/models/tag');
var models      = require('../Models');
var Promise     = require('bluebird');
var cool        = require('cool-ascii-faces');
var jimp        = require('jimp');
var bodyParser  = require('body-parser');

var buzzwords = ['COMPUTER', 'CAN', 'GLASSES', 'GIRL', 'BIRD'];
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
];;

//GET homepage
router.get('/', function(req, res) {
  const query = tag.findOne();
  query.exec(function(err, words){
    if(err) return console.error(err);
    if(words)  buzzwords = words.tags;
    else res.redirect('/api/wordbank');
  }).then(function(data, err){
    console.log(buzzwords);
    res.render('index', {
      words: buzzwords
    })
    console.log('GET - homepage');
  });
});

// SEND IMAGE TO API TO CALCULATE SCORE
// (img, user)
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
    scorePromise.then(function(result, err) {
      if (err) return console.error(err);
      player.val = result;
      player.save(function (result, err) {
        if (err) console.log(err);
        console.log("Player " + player.name + ' saved!');
      });
      res.redirect('/leaderboards/:user(' + player.name + ')/:score(' + player.val + ')');
    })
})

// View leaderboards
router.get('/leaderboards/:user?/:score?', function(req, res) {
    //the query we will make on the database (max 50 players, sort largest > smallest)
    const usern = req.params.user || null;
    const points = req.params.score || null;
    const query = score.find().sort({val: -1}).limit(10);
    console.log(usern !== null);
    query.exec(function(err, scores) {
      if (err) return console.error(err);
      for(var i = 0; i < scores.length; i++) {
        // edit res to send leaderboard to client
        board[i][1] = scores[i].name;
        board[i][2] = scores[i].val;
      }
    res.render('leaderboards', {
      hasUser: (usern !== null),
      nsfw: (points < 0),
      player : usern,
      mainscore : points,
      user : board
    })
  });
});

// GET 5 BUZZWORDS OF THE DAY
router.get('/api/wordbank', function(req, res) {
  buzzwords = functions.generateWords();
  tag.update(null, { $set: { tags: buzzwords }}, function(err, data){
    if (err) return console.error(err);
    console.log("New words generated!");
    var words = new tag({
      tags: buzzwords
    });
    res.redirect('/');
  });
});

router.get('/cool', function(request, response) {
  response.send(cool());
})

module.exports = router;
