var express = require('express');
var router = express.Router();

var text = 'ServerUp'
//GET homepage
router.get('/', function(req, res) {
    res.render('index', {
        title: text
    });
    console.log('GET - homepage')
});

router.post('/', function(req, res) {
    text = req.body.text
    console.log('POST - text')
    res.render('index', {
        title: text
    });
});

module.exports = router;
