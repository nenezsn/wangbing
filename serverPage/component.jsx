import React from 'react';
import ReactDOMServer from 'react-dom/server'
class Hello extends React.Component{
    componentDidMount(){
        console.log('2222')
    }
    render(){
        return <div onClick={()=>{
            alert('1111')
        }}>
            welcome to beijing province
        </div>
    }
}
module.exports = ReactDOMServer.renderToString(<Hello/>)