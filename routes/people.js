var express = require('express');
var router = express.Router();


router.get('/data1', function (req, res, next) {
  let data = req.query //获取get url?后面传过来的参数
  res.json(data)
});

router.post('/data1', function (req, res, next) {
  let data = req.body //获取post body 请求体数据
  res.json(data)
});

router.put('/data1', function (req, res, next) {
  let data = req.body //获取put body 请求体数据
  res.json(data)
});

router.get('/data2', function (req, res, next) {
  res.send("people data2")
});

module.exports = router;
