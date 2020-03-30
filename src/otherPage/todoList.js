import React from 'react';
import { Collapse, Icon, Input, Button, Statistic } from 'antd';
import styles from './app.less'
const { Panel } = Collapse;
import moment from 'moment'

class TodoList extends React.Component {
    state = {
        list: [],
        textVal: ''
    }
    onHandleChange = (e) => {
        console.log('e',e)
        this.setState({
            textVal: e.target.value
        })
    }
    addList = (e) => {
        if(!e.target.value){
            return
        }
        const { list } = this.state
        list.unshift({
            id: new Date().getTime(),
            content: e.target.value,
            status: 'doing'
        })
        this.saveStorage(list)
        this.setState({
            list,
            textVal:''
        })
    }
    onOk = (item, status) => {
        const { list } = this.state
        const findIndex = list.findIndex(single => single.id == item.id)
        list[findIndex].status = status
        this.saveStorage(list)
        this.setState({
            list
        })
    }
    onDelete = (item) => {
        let { list } = this.state
        list = list.filter(single => single.id != item.id)
        this.saveStorage(list)
        this.setState({
            list
        })
    }
    saveStorage = (list) => {
        localStorage.setItem('todolist', JSON.stringify(list))
    }
    getStorage = () => {
        const list = JSON.parse(localStorage.getItem('todolist'))
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
        this.saveStorage([])
    }
    componentDidMount() {
        this.getStorage()
    }
    render() {
        const { list, textVal } = this.state
        const doingList = list.filter(item => item.status == 'doing')
        const completeList = list.filter(item => item.status == 'complete')
        return <div className={styles.todo_box}>
            <Input placeholder='请输入添加的事物,回车确认' value={textVal} onChange={this.onHandleChange} onPressEnter={this.addList}></Input>
            <Statistic title="进行中" value={doingList.length} />
            <Statistic title="已完成" value={completeList.length} />
            <Collapse accordion>
                <Panel header={'进行中'} key="1">
                    {doingList.map(item => {
                        return <div className={styles.item} key={item.id}>
                            <span className={styles.left}>{item.content} <i>{moment(item.id).format('YYYY-MM-DD hh:mm:ss')}</i></span>
                            <span className={styles.right}>
                                <Icon type="check-circle" onClick={() => { this.onOk(item, 'complete') }} />
                                <Icon type="delete" onClick={() => { this.onDelete(item) }} />
                            </span>
                        </div>
                    })}

                </Panel>
                <Panel header='已完成' key="2">
                    {
                        completeList.map(item => {
                            return <div className={styles.item} key={item.id} >
                                <span className={styles.left} style={{ textDecoration: 'line-through' }}>{item.content} <i>{moment(item.id).format('YYYY-MM-DD hh:mm:ss')}</i></span>
                                <span className={styles.right}>
                                    <Icon type="check-circle" onClick={() => { this.onOk(item, 'doing') }} className={styles.acitve} />
                                    <Icon type="delete" onClick={() => { this.onDelete(item) }} />
                                </span>
                            </div>
                        })
                    }
                </Panel>
            </Collapse>
            <Button onClick={this.clear} type='primary'>清空</Button>
        </div>
    }
}
export default TodoList