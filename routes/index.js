var express = require('express');
var router = express.Router();

//GET homepage
router.get('/', function(req, res) {
  res.render('index', {
      title: 'ServerUp'
  });
  console.log('GET - homepage')
});
/*
router.post('/', function(req,m res) {

}*/

module.exports = router;
