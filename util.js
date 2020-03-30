var os = require('os');//获取系统信息

// 获取本机ip
module.exports.getIPv4 =  function() {
    var interfaces = os.networkInterfaces();//获取网络接口列表
    var ipv4s = [];//同一接口可能有不止一个IP4v地址，所以用数组存
    Object.keys(interfaces).forEach(function (key) {
        interfaces[key].forEach(function (item) {
            //跳过IPv6 和 '127.0.0.1'
            if ('IPv4' !== item.family || item.internal !== false) { return false; }
            ipv4s.push(item.address);//可用的ipv4s加入数组
        })
    });
    return ipv4s[0];//返回一个可用的即可
}

// base64编码
module.exports.base64encode=function(text){
    return new Buffer(text).toString('base64')
}
// base64解码
module.exports.base64decode=function(text){
    return new Buffer(text,'base64').toString()
}

