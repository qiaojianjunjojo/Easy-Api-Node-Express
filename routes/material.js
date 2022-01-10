var express = require('express');
var rateLimit = require('express-rate-limit');
var RedisStore = require("rate-limit-redis");


var router = express.Router();

//搭配redis 实现限流
var limiter_5timesperhour = rateLimit({
  store: new RedisStore({
    expiry: 60 * 60,  //seconds - how long each rate limiting window exists for. Defaults to 60.
    resetExpiryOnChange: true, // if the expiry time should be reset every time a key is incremented/decremented. This means that
                              // when the limit is reached and the user is given a 429 response, the rate limit window is extended. Defaults to false.
    prefix: '/material/data1',     //string - prefix to add to entries in Redis. Defaults to rl:. 推荐用route来标识
    redisURL: 'redis://10.189.127.62:40118'
  }),
  delayMs: 0,
  max: 5, // Limit each IP to 5 requests per `windowMs` 
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

var limiter_10timesperday = rateLimit({
  store: new RedisStore({
    expiry: 24 * 60 * 60,
    resetExpiryOnChange: true,
    prefix: '/material/data2',
    redisURL: 'redis://10.189.127.62:40118'
  }),
  delayMs: 0,
  max: 10, // Limit each IP to 5 requests per `windowMs` 
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

router.get('/data1', limiter_5timesperhour, function (req, res, next) {
  res.send("material data1");
});

router.get('/data2', limiter_10timesperday, function (req, res, next) {
  res.send("material data2");
});

module.exports = router;
