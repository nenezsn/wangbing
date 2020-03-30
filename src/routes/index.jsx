/**
 * 目前都是练习用的功能
 */
import React from 'react'
import {Button} from 'antd'

export default class name extends React.Component {
  reqiureEnsure = () => {
    //代码分割 按需加载
    require.ensure([], require => {
      require('../util/a.js')
    },'a')
  }
  markError = () => {
    window.fetch('/err', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({ err: '这是一个主动触发错误' })
      // body: querystring.stringify({ err: '这是一个主动触发错误' })
    })
  }
  addError=()=>{
    window.location.href='/addDebug'
  }
  checkError=()=>{
    window.location.href='/checkDebug'
  }
  deleteError=()=>{
    window.location.href='/deleteDebug'
  }
  downError=()=>{
    window.location.href='/downloadDebug'
  }
  to_logout = () => {
    let form = document.createElement('form')
    form.action = '/logout'
    form.method = 'POST'
    form.name = 'logout'
    form.type = 'hidden'
    form.target = 'iframe_display'
    document.body.appendChild(form)
    form.submit()
  }

  render() {
    return (
      <div>
        <Button onClick={this.reqiureEnsure}>按需加载脚本</Button>

        <Button onClick={this.markError}>记录错误日志</Button>
        <Button onClick={this.addError}>增加错误日志</Button>
        <Button onClick={this.checkError}>查看错误日志</Button>
        <Button onClick={this.deleteError}>删除错误日志</Button>
        <Button onClick={this.downError}>下载错误日志</Button>

        {/* get通过req.query post通过req.body */}
        <form action="/logAction" method="POST" target='iframe_display' id='login'>
          账号： <input type="text" name="username" />
          <br />
          密码： <input type="password" name="password" />
          <br />
          <input type="submit" value="登录" />
        </form>
        <Button onClick={()=>{document.getElementById('login').submit()}}>登录</Button>

        <Button onClick={this.to_logout}>登出操作</Button>

      </div>
    )
  }
}
