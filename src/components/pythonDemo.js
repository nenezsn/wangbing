var React = require('react');
import { message, Spin } from 'antd'
import querystring from 'querystring'
import CodeClass from './codeClass'
import styles from './pythonDemo.less'

let editor = {}
let initVal = `
counter = 100 # 赋值整型变量
miles = 1000.0 # 浮点型
name = "John" # 字符串
print counter
print miles
print name
for letter in 'Python':
  print '当前字母 :', letter
fruits = ['banana', 'apple', 'mango']
for fruit in fruits:
  print '当前水果 :', fruit
print "Good bye!"
`
let mustHeader = `#!/usr/bin/python
# -*- coding: UTF-8 -*-`
class Code extends React.Component {
  state = {
    result: '',
    log: '',
    error: false,
    loading: false
  }
  formate = () => {
    editor.setValue(editor.formate())
  }
  clear = () => {
    editor.setValue('')
  }
  clearResult = () => {
    this.setState({
      result: ''
    })
  }
  clearlog = () => {
    this.setState({
      log: ''
    })
  }
  changeLoading = (flag) => {
    this.setState({
      loading: flag
    })
  }
  request = (url, params) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: querystring.stringify(params)
    }
    return fetch(url, options)
      .then(res => res.json())
  }
  runtime = async () => {
    const params = {
      scriptStr: `${mustHeader}
${editor.getValue()}`,
      scriptType: 'PYTHON'
    }
    const url = '/debug/script.execute'
    this.clearResult()
    this.clearlog()
    this.changeLoading(true)
    const data = await this.request(url, params)
    this.changeLoading(false)
    message.success('请求成功')
    if (data.code == -1) {
      this.setState({
        error: true,
        result: data.data
      })
    } else if (data.code == 200) {
      this.setState({
        result: data.data,
        error: false
      })
    } else {
      message.error(data.msg)
    }
  }
  init = () => {
    editor = new CodeClass({
      id: 'py_editor',
      mode: 'python',
      options: {
        theme: 'monokai'
      }
    })
    editor.setValue(initVal)
  }
  componentDidMount() {
    this.init()
  }
  render() {
    const { result, error, loading } = this.state
    return <div className={styles.py_editor}>
      <div className={styles.tool_bar}>
        <span className={styles.tool_btn} onClick={this.runtime}>运行</span>
        <span className={styles.tool_btn} onClick={this.formate}>格式化</span>
        <span className={styles.tool_btn} onClick={this.clear}>清除</span>
        <span style={{ float: 'right', color: '#fff', lineHeight: '34px', marginRight: 5 }}>python在线编辑器</span>
      </div>
      <div className={styles.editor_content}>
        <div className={styles.left}>
          <div id='py_editor' style={{ height: '100%' }}></div>
        </div>
        <div className={styles.right}>
          <div className={styles.result}>
            <div className={styles.result_tab}>结果:<span className={styles.tool_btn} style={{ float: 'right' }} onClick={this.clearResult}>清空</span></div>
            <Spin spinning={loading}>
              <textarea type='textarea' value={result} disabled style={{color:error?'red':'#fff'}}></textarea>
            </Spin>
          </div>
          <div className={styles.console}>
            <div className={styles.console_tab}>日志:<span className={styles.tool_btn} style={{ float: 'right' }} onClick={this.clearlog}>清空</span></div>
            <div className={styles.console_content}>
              {/* <textarea type='textarea' value={this.state.result} disabled></textarea> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default Code
