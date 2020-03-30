/**
 * 临时的websocket服务器
 */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('port', process.env.PORT || 6080)
app.set('trust proxy', true)


//主要用来解析前端传过来的数据(分装在req.body)
app.use(bodyParser.json()) //解析 Content-type : appliaction/json 就是json对象
app.use(bodyParser.urlencoded({ extended: true })) //解析 Content-type : application/x-www-form-urlencoded 是一个通过&拼接起来的字符串


// app.get('/socket_connect',(req,res)=>{
var ws = require("nodejs-websocket");
var server = ws.createServer(function (conn) {
    conn.on("text", function (str) {
        server.connections.forEach(function (conn) {
            if (str == 'name') {
                conn.sendText('王冰')
            } else if (str == 'age') {
                conn.sendText('25')
            } else if (str == 'ping') {
                console.log('ping')
                conn.sendText('pong')
            } else if (str == 'login') {
                console.log('login')
                conn.sendText('success')
            }
        })
    })
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });

}).listen(8001)


app.get('*', (req, res, next) => {
    res.send('404')
})

app.listen(app.get('port'), function () {
    console.log('可访问端口:' + 'http://localhost:' + app.get('port'))
})
