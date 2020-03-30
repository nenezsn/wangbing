import React from 'react';
import styles from './app.less'
import { Input, Button, Icon } from 'antd'
import moment from 'moment'

class Diary extends React.Component {
    state = {
        list: [],
        textVal:''
    }
    onHandleChange=(e)=>{
        this.setState({
            textVal:e.target.value 
        })
    }
    onAddthing = (e) => {
        if(!e.target.value){
            return
        }
        const { list } = this.state
        list.unshift({
            id:new Date().getTime(),
            content:e.target.value
        })
        this.saveStorageList(list)
        this.setState({
            list,
            textVal:''
        })
    }
    onDelete = (item) => {
        let { list } = this.state
        list = list.filter(single => single.id != item.id)
        this.saveStorageList(list)
        this.setState({
            list
        })
    }
    saveStorageList = (list) => {
        localStorage.setItem('thingList', JSON.stringify(list))
    }
    getStorageList = () => {
        const list = JSON.parse(localStorage.getItem('thingList'))
        if (list != 'undefined') {
            this.setState({
                list
            })
        }
    }
    clear = () => {
        this.setState({
            list: []
        })
        this.saveStorageList([])
    }
    componentDidMount() {
        this.getStorageList()
    }
    render() {
        const { list, textVal } = this.state;
        return <div className={styles.diary_box}>
            <Input placeholder='请输入添加的事物,回车确认' value={textVal} onChange={this.onHandleChange} onPressEnter={this.onAddthing}></Input>
            {
                list.map((item, index) => {
                    return <p key={item.id}>{index + 1} : {item.content} <span className={styles.time}>{moment(item.id).format('YYYY-MM-DD hh:mm:ss')}</span> <Icon type="delete" onClick={() => { this.onDelete(item) }} /></p>
                })
            }
            <Button onClick={this.clear} type='primary'>清空</Button>

        </div>
    }
}
export default Diary