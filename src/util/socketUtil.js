/**
 * @description
 * 1.建立期间是否超时，超时关闭。
 * 2.定时发送心跳，心跳超时关闭。
 * 3.页面离开，断网，关闭。
 * 4.异常错误，自动重连。
 */
var ws = null
var build = 6 //建立时间
var buildTimer = null //
var heartBeat = 10//每10秒检测一次心跳
var heartBeatTimer = null
var heartOut = 5 //超过5秒，则心跳结束，重新链接
var heartOutTimer = null
var reconnect = 2 //断开重连间隔 
var url = 'ws://localhost:8001'
class Socket {
    constructor({ onmessage }) {
        if (!ws) {
            this.onmessage = onmessage
            this.connect()
        }
    }
    connect() {
        if (ws) return
        this.checkBuildOut()
        ws = new WebSocket(url);
        ws.onopen = (e) => {
            console.log('ws服务器连接成功')
            this.send('login')
            this.checkPageShow()
            this.checkOnline()
        }
        ws.onclose = (e) => {
            this.close('sr close')
            console.error("ws服务器已关闭");
        }
        ws.onerror = (e) => {
            console.error("连接出错");
            this.reconnect()
        }
        ws.onmessage = (e) => {
            const action = e.data
            const _this = this
            switch (action) {
                case 'pong':
                    console.log('pong')
                    _this.sendHeartBeat()
                    break;
                case 'success':
                    console.log('222222')
                    clearTimeout(buildTimer)
                    _this.sendHeartBeat()
                    break;
                default:
                    _this.onmessage(e.data)
            }
            console.log('收到来自服务器的消息:' + e.data)
        }
    }
    send(msg) {
        ws && ws.send(msg)
    }
    close(type) {
        console.log('type', type)
        ws && ws.close()
        this.clear()
    }
    // 当前页面是否展示，不展示则停止接收socket
    checkPageShow() {
        let hidden, visibilityChange;
        if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }
        if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
            console.warn("请尝试使用谷歌或者火狐浏览器");
        } else {
            document.addEventListener(visibilityChange, this._handleAppStateChange.bind(this, hidden), false);
        }
    }
    checkOnline() {
        window.addEventListener('online', this.reconnect.bind(this), false);
        window.addEventListener('offline', this.close.bind(this, 'offline'), false);
    }
    sendHeartBeat() {
        clearTimeout(heartOutTimer)
        heartBeatTimer = setTimeout(() => {
            ws.send('ping')
            this.checkHeartOut()
        }, heartBeat * 1000)
    }
    checkBuildOut() {
        buildTimer = setTimeout(() => {
            this.close('buildOut')
        }, build * 1000)
    }
    checkHeartOut() {
        heartOutTimer = setTimeout(() => {
            ws && this.close('heartOut')
        }, heartOut * 1000)
    }
    //设备前后台状态
    _handleAppStateChange(hidden) {
        if (document[hidden]) {
            this.close('page hidden')
        } else {
            this.reconnect()
        }
    }
    reconnect() {
        setTimeout(() => {
            this.connect();
        }, reconnect * 1000)
    }
    clear() {
        ws = null
        clearTimeout(buildTimer)
        clearTimeout(heartBeatTimer)
        clearTimeout(heartOutTimer)
    }

}
export default Socket