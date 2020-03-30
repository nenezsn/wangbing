import React from 'react'
import { Button, Input, Divider } from 'antd'
import Confirm from '../components/confirm'


class Index extends React.Component {
    input = React.createRef() 
    // 获取
    getRefDom = ()=>{
        // react 16
        console.log('this.input', this.input.current)
        // 回调
        console.log('this.inputRef', this.inputRef)
        //  this.refs.input 不再推荐
        console.log('this.input2',this.refs.input2)
    }
    react_render = () => {
        Confirm({
            handleOk() {
                console.log('haha ')
            }
        })
    }
    render() {
        return <div style={{width:600,margin:'0 auto'}}>
            <Divider>Render props模式</Divider>

            <Parent
                ref={val => { this.parent = val }}
                render={(state, handleClick) => {
                    return <Button onClick={handleClick}>点击操作 </Button>
                }} >
            </Parent>

            <Divider>Class statict</Divider>
            <Parent.Son></Parent.Son>

            <Divider>ref的创建方式</Divider>
            <Button onClick={this.getRefDom}>打印dom</Button>
            <Input ref={this.input} hidden/>
            <Input ref={(val) => { this.inputRef = val }} hidden/>
            <Input ref='input2' hidden/>

            <Divider>reactDom.render</Divider>
            <Button onClick={this.react_render}>测试react.render</Button>
            
            <Divider></Divider>

        </div>
    }
}

export default Index




class Parent extends React.PureComponent {
    state = {
        color: 'red'
    }

    static Son = function () {
        console.log('this',this)
        return <div>son组件</div>
    }
    componentDidMount(){
        console.log('this',this)
    }

    handleClick = () => {
        alert('触发了点击操作')
    }
    render() {
        return <div>{
            this.props.render(this.state, this.handleClick)
        }
            {
                React.Children.map(this.props.children, item => {
                    return React.cloneElement(item, { title: 'wangbing' })
                })
            }
        </div>
    }
}