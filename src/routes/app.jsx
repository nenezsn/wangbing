import React from 'react';
import { Link } from 'react-router-dom'
import { Menu, } from 'antd'
const navList = [
    { path: '/', title: '首页' },
    { path: '/Upload', title: 'Upload' },
    { path: '/Render', title: 'RenderProps' },
    { path: '/Test', title: 'Test' },
    { path: '/OldLife', title: 'OldLife' },
    { path: '/SocketDemo', title: 'Socket' },
    { path: '/Code', title: 'Code' },
    { path: '/Redux', title: 'Redux' },
    { path: '/Cc', title: 'Cc' },
]
export default function app(props) {
    const current = location.pathname
    return (
        <div style={{ height: '100%', backgroundColor: '#fcfcfc' }}>
            <Menu
                style={{ display: 'inline-block', width: 'calc(100% - 160px)', height: 60, lineHeight: '60px' }}
                mode="horizontal"
                selectedKeys={[current]}
            >
                {
                    navList.map(item => {
                        return <Menu.Item key={item.path}>
                            <Link to={item.path}>{item.title}</Link>
                        </Menu.Item>
                    })
                }
            </Menu>
            <div>
                {props.children}
            </div>
        </div>
    )
}