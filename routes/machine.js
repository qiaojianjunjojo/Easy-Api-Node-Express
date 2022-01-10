var express = require('express');
var router = express.Router();

router.get('/data1', function(req, res, next) {
  res.send("machine data1")
});

router.get('/data2', function(req, res, next) {
  res.send("machine data2")
});

module.exports = router;
 