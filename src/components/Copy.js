import React from 'react'
class CopyText extends React.Component {
    constructor(props) {
        super(props)
        this.style = { resize: 'none', border: 'none', outline: 'none',height:0,width:0 }
    }
    onHandleCopy = () => {
        var wrapper = this.refs.copy_text;
        wrapper.select();
        document.execCommand("Copy");
        console.log('复制成功')
    }
    render() {
        return <textarea ref='copy_text' style={this.style} readonly='readonly'>{this.props.text}</textarea>
    }
}
export default CopyText