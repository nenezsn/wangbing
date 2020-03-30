import React from 'react';
import { Button, Input, message } from 'antd';
import Socket from '../util/socketUtil'
window.instance = null
class ChatRoom extends React.Component {
    state = {
        textVal: ''
    }
    connect = () => {
        instance = new Socket({
            onmessage: (msg) => {
                message.success('收到来自服务器的消息:' + msg)
            }
        })

    }
    close = () => {
        instance.close()
    }
    sendMsg = () => {
        instance.send(this.state.textVal);
    }
    handleChange = (e) => {
        this.setState({
            textVal: e.target.value
        })
    }
    render() {
        return (<div>
            <Button onClick={this.connect}>建立连接</Button>
            <Button onClick={this.close}>关闭连接</Button>
            <Input placeholder='请输入信息' value={this.state.textVal} onChange={this.handleChange} />
            <Button onClick={this.sendMsg}>发送消息</Button>
        </div>)
    }
}

export default ChatRoom