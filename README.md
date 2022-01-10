## API开发框架(Node- express版)
环境需求:node14

## Installation：
clone:
```
git clone http://fsrserver.cminl.oa/data_team/easy-api-node.git
cd easy-api-node
```
安装项目依耐的package
```
npm install
```
等待下载完毕，根目录会多出一个node_modules目录.

本地启动：  
cmd
```
npm start
如果想要开启更详细的运行日志(debug):
set DEBUG=* 
npm start
```


## Swagger UI相关
项目启动后 浏览器输入 http://127.0.0.1:3000/apidocs/ 会呈现swagger界面.  
1.怎么修改成我自己的swagger UI？  
使用swagger edit在线编辑器编辑：  
https://editor.swagger.io/  
参考public/swagger.yaml 或者官网上的demo,编写你自己的swagger页面。  
编写完成后保存为json文件，替换掉public/swagger.json;  
重启项目打开 http://127.0.0.1:3000/apidocs/

## express-rate-limit
see more detail  https://dev.to/brunohgv/limiting-node-js-api-calls-with-express-rate-limit-11kl
```javascript
...

const express = require('express')
const rateLimit = require('express-rate-limit')
const app = express()

const apiRequestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 2 // limit each IP to 2 requests per windowMs,
    message: "Your limit exceeded"
})

app.use(apiRequestLimiter)
...
```
rate-limit-redis 持久化
see more detail: https://www.npmjs.com/package/rate-limit-redis
```javascript
......
var RedisStore = require("rate-limit-redis");

const limiter_5timesperhour = rateLimit({
  store: new RedisStore({
    expiry: 60 * 60,  //seconds - how long each rate limiting window exists for. Defaults to 60.
    resetExpiryOnChange: true, // if the expiry time should be reset every time a key is incremented/decremented. This means that
                              // when the limit is reached and the user is given a 429 response, the rate limit window is extended. Defaults to false.
    prefix: '/material/data1',     //string - prefix to add to entries in Redis. Defaults to rl:. 推荐用route来标识
    redisURL: 'redis://10.189.127.62:40118'
  }),
  delayMs: 0,   //disable delaying - full speed until the max limit is reached
  max: 5,   // Limit each IP to 5 requests per `windowMs` 
  standardHeaders: true,    // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,     // Disable the `X-RateLimit-*` headers
})

app.use(limiter_5timesperhour);

......
```