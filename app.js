var models = require("./Models");
var functions = require("./Functions");

var keywords;

functions.predictModel(models.GENERAL, functions.base64("images/huge image1.jpg"), words => keywords = words);

console.log(keywords);
