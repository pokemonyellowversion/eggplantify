var express = require('express');
var router = express.Router();
// var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    CLIENT_ID: process.env.CLARIFAI_CLIENT_ID,
    CLIENT_SECRET: process.env.CLARIFAI_SECRET
 });
});

module.exports = router;

