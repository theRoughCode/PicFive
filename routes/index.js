var express = require('express');
var router = express.Router();

//GET homepage
router.get('/', function(req, res) {
  res.render('index', {
      temp: 'HelloWorld'
  });
  console.log('GET - homepage')
});
/*
router.post('/', function(req,m res) {

}*/

module.exports = router;
