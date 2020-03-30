import React from 'react'
import { Button, Divider } from 'antd'
import intl from 'react-intl-universal';
import Confirm from '../components/confirm'
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
        tp_key:1
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
        const otherWindow = window.open('http://localhost:8000')
        setTimeout(function () {
            otherWindow.postMessage('我发消息了', 'http://localhost:8000')
        }, 3000)
        // window.addEventListener("message", receiveMessage, false) ;
        //     function receiveMessage(event) {
        //         console.log(event.data);
        //     }
    }
    test_co = () => {
        function delay(num) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(num + '秒到了')
                    console.log(num + '秒到了')
                }, num * 1000)
            })
        }
        let arr = [1, 2, 3]
        co(function* () {
            for (let i = 0; i < arr.length; i++) {
                let data = yield delay(arr[i])
            }
        })
    }
    test_async = async () => {
        function delay(num) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(num + '秒到了')
                    console.log(num + '秒到了')
                }, num * 1000)
            })
        }
        let arr = [1, 2, 3]
        for (let i = 0; i < arr.length; i++) {
            let data = await delay(arr[i])
        }
    }
    react_render = () => {
        Confirm({
            handleOk() {
                console.log('haha ')
            }
        })
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

    getDiary=()=>{
        const params = {
            dataStatus: 1,
            language: 'zhs',
            pageNo: 1,
            pageSize: 90,
            range: -1,
            timestamp: 1577240283039,
            token: `hxvCyME4eA6xOCJtJbSoSJRoCuHsvOk3AUaD_8yldGtNCkXVsC-YiVLdZlGGmsKrZ-3KcYzKz-yaZ_ujbUVIk8aK2yabEXqGRuMrCiJq5dZwH7zsojZ5TI36KgXHzmc3ZhrF4ZKHER_jlfS9H_-Tf68XUP21o7zzDRARC0TNXEvfU7pJE3vvKLRdH05XnyxlHouLzDH6tczBdvhEp5CVg3X6giwT4xy0tVgJKgqRM8gYu2UMMLfa01vGuP_-kR-o1PFRqaSluUk8nXHnqo1vVXlyU6Uwvwj0s1QTWsREYhbzBF1BIiRycKm90NRNWJqpKStagC9I-rudBnmv-aXv_Q`,
            withPublic: false
        }
        const qs = querystring.stringify(params)
        window.fetch('/yonyou/logger/diaryQuery/getAllDiary?'+qs)
        .then(data=>data.json())
        .then(data=>{
            const list = data.data
           const date =  list.map(item=>item.diaryTime)
                        .sort((a,b)=>b-a)
                        .map(item=>moment(item).format('YYYY-MM-DD'))
           console.log('date',date)
        })
        
    }
    refresh=()=>{
        document.getElementById('t_p').innerHTML='缓存'
        setTimeout(()=>{
            this.setState({
                tp_key:this.state.tp_key+1
            })
        },3000)
    }
    returnBaidu=()=>{
        return 'https://www.baidu.com'
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
                <Button onClick={this.test_co}>测试co</Button>
                <Button onClick={this.test_async}>测试async</Button>
                <Button onClick={this.react_render}>测试react.render</Button>
                <Button onClick={this.test_preState}>测试preState{this.state.count}</Button>
                <iframe
                    src={this.returnBaidu()}
                ></iframe>
                <div onClick={this.doPrint}>点击打印</div>
                <a href='/oss' download="w3logo.pdf">下载</a>
                <Button onClick={this.getDiary}>获取日志</Button>
                <Button onClick={this.refresh}>刷新key</Button>
                <p id='t_p' key={this.state.tp_key}>测试</p>
            </div>
        </div>
    }
}