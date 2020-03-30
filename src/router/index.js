import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd'
import App from '@routes/app'

const RouterConfig = function () {
  return (
    <Router>
      {/* 用于内置组件国际化 */}
      <LocaleProvider locale={zhCN}>
        <App>
        {/* <Route path="/" exact component={require('@routes/pdf')} /> */}
          <Route path="/" exact component={require('@routes/index')} />
          <Route path="/Upload" exact component={require('@routes/upload')} />
          <Route path="/Render" exact component={require('@routes/renderProps')} />
          <Route path="/Test" exact component={require('@routes/test')} />
          <Route path="/OldLife" exact component={require('@routes/oldLIfe')} />
          <Route path="/SocketDemo" exact component={require('@routes/socketDemo')} />
          <Route path="/Redux" exact component={require('@routes/reduxDemo')} />
          <Route path="/Code" exact component={require('@routes/code')} />
          <Route path="/Cc" exact component={require('@routes/cc')} />
          <Route path="/Video" exact component={require('@routes/video')} />
          <Route path="/Drag" exact component={require('@routes/drag')} />
        </App>
      </LocaleProvider>
    </Router>
  )
}
export default RouterConfig
