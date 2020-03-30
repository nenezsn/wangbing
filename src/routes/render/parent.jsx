import React from 'react'
export default class Parent extends React.PureComponent {
    state = {
        color: 'red'
    }

    static Son = function () {
        return <div>son组件</div>
    }

    handleClick = () => {
        alert('触发了点击操作')
    }
    render() {
        return <div>{
            this.props.render(this.state, this.handleClick)
        }
        {
            React.Children.map(this.props.children,item=>{
              return  React.cloneElement(item,{title:'wangbing'})
            })
        }
        </div>
    }
}