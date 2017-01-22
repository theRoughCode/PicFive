var models = require("./Models");
var functions = require("./Functions");

//const keywords = functions.predictModel(models.GENERAL, functions.base64("images/huge image1.jpg"));

var buzzwords = functions.generateWords();
//console.log(buzzwords);

var keywords;
/*var promise = new Promise(function(resolve, reject) {
  functions.predictModel(models.NSFW, "http://i924.photobucket.com/albums/ad90/callboybangalore2000/Kim-Kardashian-Bikini-Candids/Kim-Kardashian-Bikini-Candids-2.jpg").then(
    x => keywords = x,
    function(err){
      console.error(err);
    }
  );
  console.log(temp);
});*/

functions.predictModel(models.NSFW, "http://i924.photobucket.com/albums/ad90/callboybangalore2000/Kim-Kardashian-Bikini-Candids/Kim-Kardashian-Bikini-Candids-2.jpg").then( x => {
  keywords = functions.get_JSON(x);
  console.log(keywords);
});

/*.then(
  x => {
    keywords = x;
    console.log(keywords);
  },
  function(err){
    console.error(err);
  }
);
*/
