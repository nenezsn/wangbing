import React from 'react'
import { Button, Divider } from 'antd'
import intl from 'react-intl-universal';
import co from 'co'
var QRCode = require('qrcode')
import $ from 'jquery'
import querystring from 'querystring';
import moment from 'moment'
import { setTimeout } from 'timers';


// locale data
const locales = {
    "en-US": require('./locales/en-US.js'),
    "zh-CN": require('./locales/zh-CN.js'),
};

export default class Test extends React.Component {
    state = {
        initDone: false,
        count: 1,
        age: '23',
        tp_key: 1,
        num: 0
    }
    copy = () => {
        var wrapper = document.getElementById("wrapper");
        wrapper.select();
        document.execCommand("Copy");
        alert("复制成功！" + wrapper.value);
    }
    thqs = () => {
        //    const dom = document.getElementById('getCcVideoInfo')
        //    dom.submit()
        window.fetch('/getCcVideoInfo', { method: 'POST' }).then(res => res.json()).then(data => {
            console.log('data', data)
        })
    }
    componentDidMount() {
        this.loadLocales();
        this.addEvent()
    }
    addEvent = () => {
        document.getElementById('state').addEventListener('click', () => {
            this.setState({
                num: this.state.num + 1
            })
            console.log(this.state.num)
            this.setState({
                num: this.state.num + 1
            })
            console.log(this.state.num)
        })
        console.warn('在非react事件系统中，setState才会是同步的，例如addEventListener和setTimeout')
    }

    loadLocales = () => {
        // init method will load CLDR locale data according to currentLocale
        // react-intl-universal is singleton, so you should init it only once in your app
        intl.init({
            currentLocale: 'zh-CN', // TODO: determine locale here
            locales,
        }).then(() => {
            // After loading CLDR locale data, start to render
            this.setState({ initDone: 'zh-CN' });
        });
    }
    tobaidu = () => {
        var tempwindow = window.open('', '_blank');
        setTimeout(() => {
            tempwindow.location = 'https://cloud.seentao.com';
        }, 5000)
        setTimeout(() => {
            tempwindow.close()
        }, 8000)
    }
    change = () => {
        const flag = this.state.initDone == 'zh-CN' ? 'en-US' : 'zh-CN'
        intl.init({
            currentLocale: flag, // TODO: determine locale here
            locales,
        }).then(() => {
            // After loading CLDR locale data, start to render
            this.setState({ initDone: flag });
        });
    }
    draw_qrcode = () => {
        var canvas = document.getElementById('canvas')
        QRCode.toCanvas(canvas, 'https://tclass.seentao.com/', function (error) {
            if (error) console.error(error)
            console.log('success!');
        })
    }
    postMessage = () => {
        const frame = document.getElementById('frame')
        const otherWindow = frame.contentWindow
        setTimeout(function () {
            otherWindow.postMessage('我发消息了', 'http://localhost:8000')
        }, 3000)
        window.addEventListener("message", receiveMessage, false);
        // event.origin 来源
        // event.source.postMessage('value',event.origin) 实现双向通信
        // event.data 数据
        // webpack自身也会触发postMessage  注意过滤信息
        function receiveMessage(event) {
            console.log(event.data);
        }
    }

    test_preState = () => {
        this.setState((preState) => {
            return {
                count: preState.count + 1
            }
        })
    }

    doPrint = () => {
        $("body").html('2222')
        window.print();
    }

    refresh = () => {
        document.getElementById('t_p').innerHTML = '缓存'
        setTimeout(() => {
            this.setState({
                tp_key: this.state.tp_key + 1
            })
        }, 3000)
    }

    render() {
        return <div>
            <div >
                <Divider>粘贴复制功能</Divider>
                {/* 原生js实现粘贴复制，记住多行文本框的支持 */}
                <textarea id="wrapper">dasdas</textarea>
                <span id="btn" onClick={this.copy}>复制</span>
                <Divider>获取数据</Divider>
                <Button onClick={this.thqs}>获取视频信息</Button>
                <form action="/getCcVideoInfo" method="POST" id='getCcVideoInfo' type='hidden'></form>
                <form action="/getCcLiveInfo" method="POST" id='getCcLiveInfo' type='hidden'></form>
                <Divider>react国际化</Divider>
                <Button onClick={this.change}>切换</Button>
                <div>
                    {intl.get('HELLO')}
                </div>
                <Divider>二维码</Divider>
                <Button onClick={this.draw_qrcode}>生成二维码</Button>
                <canvas id="canvas"></canvas>
                <Divider>dashBoard</Divider>
                <div className='name'>name</div>
                <Button onClick={() => { window.location.href = '/download_resource?' }}>下载文件</Button>
                <Button onClick={this.tobaidu}>打开新页被拦截问题</Button>
                <Button onClick={this.postMessage}>postMessage</Button>
                {/* <iframe
                src='http://localhost:8000'
                id = 'frame'
                >
                </iframe> */}
                <Button onClick={this.test_preState}>测试preState{this.state.count}</Button>

                <div onClick={this.doPrint}>点击打印</div>
                <a href='/oss' download="w3logo.pdf">下载</a>
                <Button onClick={this.refresh}>刷新key</Button>
                <p id='t_p' key={this.state.tp_key}>测试</p>
                <button id='state'>测试setState</button>
            </div>
        </div>
    }
}