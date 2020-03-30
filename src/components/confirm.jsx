import React from 'react';
import ReactDOM from 'react-dom'
import { Button } from 'antd'
export default function Confirm({ handleOk }) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    function onOk() {
        handleOk()
        close()
    }
    function onCancel() {
        close()
    }
    function render() {
        ReactDOM.render(<Modal />, div)
    }
    function close() {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }
    function Modal (){
        return (<div style={{ position: 'fixed', top: '50%', left: '50%', width: 200, height: 200,background:'rgba(0,0,0,.7)' }}>
        <Button onClick={onOk}>确定</Button>
        <Button onClick={onCancel}>取消</Button>
    </div>)
    }

    render()
}