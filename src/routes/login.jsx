/**
 * @author wb
 * @description 批量登录测试
 */
import React from 'react'
import { Button, Table, Radio, message } from 'antd'
import querystring from 'querystring';
const md5 = require('blueimp-md5');

class Test extends React.Component {
    state = {
        list: [],
        loading: false,
        process_env: '/test'
    }
    // 切换环境
    onChange = (e) => {
        this.setState({
            process_env: e.target.value
        })
    }
    formateTime = () => {
        // return new Date().getMinutes()+ '分' +new Date().getSeconds() + '秒' + new Date().getMilliseconds()
        return new Date().getTime()
    }
    request = (url, params) => {
        const { process_env } = this.state
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: querystring.stringify(params)
        }
        return new Promise((resolve, reject) => {
            window.fetch(process_env + url, options)
                .then(data => data.json())
                .then(data => {
                    if (data.code == 200) {
                        delete data.code
                        resolve(data)
                    } else {
                        reject({
                            url: url,
                            errMsg: data.msg
                        })
                    }
                })
        })
    }
    login = (userName, password = 123456) => {
        const { list, process_env } = this.state
        let requestTime = this.formateTime()
        let userInfo = null
        let deviceId = new Date().getTime() //模拟不同设备id
        console.log('time',deviceId)
        let ticket = ''

        let url = 'https://login.seentao.com'
        // if (process_env == '/prod') {
        //     url = 'https://ttteacher.seentao.com'
        // }

        // 登录=>获取username等信息
        return this.request('/userCenter/login', {
            userName,
            password: md5(password),
            redirectUrl: '',
            showCaptcha: false,
            scene: 'login',
        }).then(data => {
            userInfo = data
            // token获取会话id
            return this.request('/userCenter/sid.local.add', {
                userToken: data.userToken,
                deviceId
            })
        }).then(data => {
            userInfo.sid = data.sid
            // 为分站点派发ticket
            return this.request('/userCenter/ticket.add', {
                userToken: userInfo.userToken,
                deviceId,
                url
            })
        }).then(data => {
            ticket = data.ticket
            // 通过ticket换取user和会话id
            return this.request('/userCenter/sid.local.get', {
                ticket: data.ticket,
                url
            })
        }).then(data => {
            list.push({
                requestTime: requestTime, //请求时间
                responseTime: this.formateTime(), //响应时间
                login_user: userInfo, //登录中心数据信息
                auth_user: data,//分站获取到的数据信息
                ticket: ticket,//派发的票据
                status:true//接口状态
            })
            this.setState({
                loading: false,
                list
            })
        }).catch(err => {
            list.push({
                requestTime: requestTime, //请求时间
                responseTime: this.formateTime(), //响应时间
                login_user: userInfo, //登录中心数据信息
                auth_user: {},//分站获取到的数据信息
                ticket: ticket,//派发的票据
                status:false,//接口状态
                errMsg:'url:' + err.url + '    ' + 'errMsg:' + err.errMsg
            })
            this.setState({
                loading: false,
                list
            })
        })

    }

    batch_login = () => {
        this.setState({
            loading: true,
            list: []
        }, () => {
            this.login('15733200553')
            // this.login('a0061@aa.com')
            // this.login('a0062@aa.com')
            // this.login('a0063@aa.com')
            // this.login('a0064@aa.com')
            // this.login('a0065@aa.com')
            // this.login('a0066@aa.com')
            // this.login('a0067@aa.com')
            // this.login('a0068@aa.com')
            // this.login('a0069@aa.com')
        })

    }

    render() {
        const { list, loading } = this.state
        return <div>
            <div style={{ width: 360, margin: '20px auto' }}>
                <Radio.Group onChange={this.onChange} value={this.state.process_env}>
                    <Radio value='/prod'>生产</Radio>
                    <Radio value='/test'>测试</Radio>
                    <Radio value='/debug'>联调</Radio>
                </Radio.Group>
                <Button loading={loading} onClick={this.batch_login}>批量登录</Button>
            </div>
            <Table loading={loading} dataSource={list} columns={columns} style={{ width: 1200, margin: '30px auto', textAlign: 'center' }} rowKey='ticket' />
        </div>
    }
}

export default Test


// 列表展示内容
const columns = [{
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render(text,obj){
        if(text){
            return <span style={{color:'#3dcc61'}}>登录成功</span>
        }else{
            return <span style={{color:'red'}}>登录失败:<br />{obj.errMsg}</span>
        }
    }
},{
    title: '登录信息',
    dataIndex: 'login_user',
    key: 'login_user',
    render(text, obj) {
        return <span>
            {text.userName}<br />
            {text.userId}<br />
            {text.userType}<br />
            {text.userToken}<br />
        </span>
    }
}, {
    title: '分站信息',
    dataIndex: 'auth_user',
    key: 'auth_user',
    render(text, obj) {
        return <span>
            {text.userName}<br />
            {text.userId}<br />
            {text.userType}<br />
            {text.userToken}<br />
        </span>
    }
}, 
{
    title: '请求时间',
    dataIndex: 'requestTime',
    key: 'requestTime',
}, {
    title: '响应时间',
    dataIndex: 'responseTime',
    key: 'responseTime',
}, 
{
    title: 'ticket',
    dataIndex: 'ticket',
    key: 'ticket',
}];