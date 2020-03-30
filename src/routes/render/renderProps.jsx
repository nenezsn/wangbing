import React from 'react'
import Parent from './parent.jsx'
import { Button, Input, Divider } from 'antd'
import { connect } from 'react-redux'

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.input = React.createRef()
    }

    componentDidMount() {
        // console.log('this.input', this.input.current)
        // console.log('this.inputRef', this.inputRef)
        // console.log('this.parent',this.parent)
    }
    render() {
        return <div>
            <Divider>Render props模式(父组件拿到子组件的内容)</Divider>
            <Parent
                ref={val => { this.parent = val }}
                render={(state, handleClick) => {
                    return <Button onClick={handleClick}>点击操作 </Button>
                }} >
            </Parent>

            <Divider>Class statict</Divider>
            <Parent.Son></Parent.Son>

            <Divider>ref的创建方式</Divider>
            <Input ref={this.input} />
            <Input ref={(val) => { this.inputRef = val }} />

        </div>
    }
}
const mapStateToProps = function ({user,info}) {
    return {
        user,info
    }
}

export default connect(mapStateToProps)(Index)