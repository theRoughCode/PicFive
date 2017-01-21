var models = require("./Models");
var functions = require("./Functions");

//const keywords = functions.predictModel(models.GENERAL, functions.base64("images/huge image1.jpg"));

var buzzwords = functions.generateWords();
console.log(buzzwords);

var keywords;
var promise = new Promise(function(resolve, reject) {
  functions.predictModel(models.GENERAL, "https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-9/13092011_10209277659841442_5682503646284244670_n.jpg?oh=0eed1ca8e8438ddfca35e08032105278&oe=5911D29D");
}).then(function(response) {
  keywords = response;
  console.log(keywords);  // prevents out of sync
});
