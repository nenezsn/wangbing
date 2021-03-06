var express = require('express');
var http = require('http');
var WebSocket = require('ws');

var app = express();
app.use(express.static(__dirname));

var server = http.createServer(app);
var wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    let count = 0
    console.log('链接成功！');
    ws.on('message', function incoming(data) {
        /**
         * 把消息发送到所有的客户端
         * wss.clients获取所有链接的客户端
         */
    });
    wss.clients.forEach(function each(client) {
        setInterval(() => {
            count += 1;
            client.send(`这是第${count}条信息<br/>`);
        }, 1000);
    });
});

server.listen(8002, function listening() {
    console.log('服务器启动成功！');
});