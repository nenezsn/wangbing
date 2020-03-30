import React from 'react';
import { Menu } from 'antd';
import styles from './app.less'
import Account from './account'
import Address from './address'
import TodoList from './todoList'
import Diary from './diary'

const menu = [
    { title: '账户管理', key: 'account' },
    { title: '地址管理', key: 'address' },
    { title: 'TodoList', key: 'todoList' },
    { title: '备忘录', key: 'diary' },
]

class App extends React.Component {
    state = {
        menuKey: 'account'
    }

    onHandleMenu = ({ key }) => {
        this.setState({
            menuKey: key
        })
    }

    renderMenu = () => {
        const { menuKey } = this.state
        return (<Menu
            selectedKeys={[menuKey]}
            mode="horizontal"
            onClick={this.onHandleMenu}
        >
            {menu.map(item => <Menu.Item key={item.key}>{item.title}</Menu.Item>)}
        </Menu>)
    }

    renderContent = () => {
        const { menuKey } = this.state
        if (menuKey == 'account') {
            return <Account />
        } else if (menuKey == 'address') {
            return <Address />
        } else if (menuKey == 'todoList') {
            return <TodoList />
        } else if (menuKey == 'diary') {
            return <Diary />
        }
        return 404
    }

    render() {
        return <div className={styles.container}>
            <div className={styles.menu}>
            {this.renderMenu()}
            </div>
            <div className={styles.content}>
                {this.renderContent()}
            </div>
        </div>
    }
}
export default App