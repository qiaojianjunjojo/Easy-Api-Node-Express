const { ALLOW_APP } = require('../config/app')
// let redis = require('../util/redisDB')
const util = require('./common')

exports.checkAPP = (req, res, next) => {
    console.log("检查请求来源是否合法！")
    if (!ALLOW_APP.includes(req.headers.fapp)) {
        res.json(util.getReturnData(5, '请求来源不正确'))
    } else {
        next()
    }
}

//以中间件的形式判断Token是否有效
exports.checkUser = (req, res, next) => {
    console.log('检测用户登录情况')
    if ('token' in req.headers) {
        //验证token
        next()
    } else {
        res.json(util.getReturnData(403, '请登录'))
    }
}

exports.checkAdmin = (req, res, next) => {
    console.log('检测管理员用户')
    if (req.headers.token.indexOf("admin") > -1) {
        next()
    } else {
        res.json(util.getReturnData(403, '权限不足'))
    }
}