var express = require('express');
var router = express.Router();
var { userLogin, userRegister } = require('../controller/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('users');
});

router.get('/error', function (req, res, next) {
  let username = req.body.username;
  let usernameLen = username.length; //"Cannot read property 'length' of undefined",
  res.json({ data: usernameLen })
});


router.post('/register', userRegister)

router.post('/login', userLogin)

module.exports = router;
