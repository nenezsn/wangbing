/**
 * 临时的websocket服务器
 */

var ws = require("nodejs-websocket");
var server = ws.createServer(function (conn) {
    let count = 0
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
    server.connections.forEach(function (conn) {
        setInterval(() => {
            count += 1;
            conn.send(`这是第${count}条信息<br/>`);
        }, 1000);
    })
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });

}).listen(8001,function(){
    console.log('启动了')
})
