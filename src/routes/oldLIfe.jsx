/**
 * @description 包含生命周期 惰性加载 以及refs新语法
 */
import React from 'react';
import { Button, Input } from 'antd'
import LazyLoad from 'react-lazyload'
class Son extends React.Component {
    state = {
        num: 0,
        str: ''
    }
    handleSon = () => {
        this.setState({
            num: this.state.num + 1,
            str: 'false'
        })
    }
    componentWillMount() {
        console.log('componentWillMount', this.props)
    }
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps)
        this.setState({
            str: nextProps.visible.toString()
        })

    }
    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate', nextProps, nextState)
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate', nextProps, nextState)
        return true

    }
    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate', prevProps, prevState)

    }
    componentDidMount() {
        console.log('componentDidMount')

    }
    componentWillUnmount() {
        console.log('componentWillUnmount')

    }
    render() {
        return <div style={{ height: 150 }}>
            {
                this.props.visible ? <Button onClick={this.handleSon}>次数:{this.state.num}{this.state.str}</Button> : <span></span>
            }
        </div>
    }
}
function Demo(props) {
    return <div ref={props.attr}>你好</div>
}

class Father extends React.Component {
    state = {
        visible: false
    }
    Ref = React.createRef()
    divRef = React.createRef()
    reseverVisible = () => {
        this.setState({
            visible: !this.state.visible
        })
        console.log()
        this.Ref.current.focus()
    }
    render() {
        return <div>
            <Demo attr={this.divRef} />
            <Button onClick={this.reseverVisible}>显示</Button>
            <Input ref={this.Ref} style={{ width: 150 }} />
            <Son visible={this.state.visible} />
            <LazyLoad>
                <Test />
            </LazyLoad>

        </div>
    }
}
export default Father
class Test extends React.Component {
    state = {

    }
    componentDidMount() {
        console.log('我渲染了')
    }
    render() {
        return <div>1111</div>
    }
}