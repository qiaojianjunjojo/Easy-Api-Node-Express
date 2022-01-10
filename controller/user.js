// let redis = require('../util/redisDB')
const util = require('../util/common')
const crypto = require('crypto')

//用户注册Api
exports.userRegister = (req, res, next) => {
    let username = req.body.username
    let password = req.body.password
    let ip = req.ip
    if (username || password) {
        //去DB判断是用户是否存在
        if (username.length > 8) {
            res.json(util.getReturnData(0, '注册成功,请登录!'))
        }
        else {
            res.json(util.getReturnData(1, '注册失败:用户名已存在！'))
        }

    } else {
        res.json(util.getReturnData(1, '注册失败:资料不完整!'))
    }
}

//用户登录Api
exports.userLogin = (req, res, next) => {
    let username = req.body.username
    let password = req.body.password
    console.log(username)
    if (username.length > 8) {
        let token = crypto.createHash('md5').update(Date.now() + username).digest('hex');
        console.log(token)
        res.json(util.getReturnData(0, '登录成功!', { token: token }))
    }
    res.json(util.getReturnData(1, '用户名或者密码错误'))
}