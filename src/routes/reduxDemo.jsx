/**
 * @desc redux 功能测试
 */
import React from 'react';
import { connect } from 'react-redux'
import { Button,  Divider } from 'antd'

class Son extends React.Component {
    componentDidUpdate(){
        console.log('son componentDidUpdate')
    }

    addAge=()=>{
        this.props.dispatch((dispatch,b)=>{
            dispatch({
                type:'user/fixUserInfo',
                payload:{
                    age:88
                }
            })
        })
    }
    render() {
        const { name,age,sex,school } =this.props.user
        const { company } = this.props.info
        return <div>
            <Divider>触发store的更新</Divider>
            <Button i onClick={this.props.fixUserInfo}>获取user state</Button>
            <input id='user' />
            <p>{name}-{age}-{sex}-{school}-{company}</p>
            <Button i onClick={this.addAge}>AddAge</Button>
        </div>
    }
}
const mapStateToProps = function ({ user, info }) {
    return {
        user, info
    }
}
const mapDispatchToProps = function(dispatch){
    return {
        fixUserInfo:()=>{
            dispatch({
                type: 'user/fixUserInfo',
                payload: {
                    name: document.getElementById('user').value
                }
            })
        },
        dispatch
    }
}

const SonComponent = connect(mapStateToProps,mapDispatchToProps)(Son)

class ReduxDemo extends React.Component {
    state = {

    }
    componentDidUpdate(){
        console.log('parent componentDidUpdate')
    }
    shouldComponentUpdate(){
        return false
    }
    render() {
      return  <SonComponent link='one'/>
    }
}
export default ReduxDemo