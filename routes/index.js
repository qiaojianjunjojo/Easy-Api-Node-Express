var express = require('express');
var router = express.Router();

/* GET home page. */  
router.get('/', function (req, res, next) {
  res.send('Hello world!')
});

router.get('/json', function (req, res, next) {
  let data = {
    name: "TOM",
    age: 18
  }
  res.json(data)
})

module.exports = router;
