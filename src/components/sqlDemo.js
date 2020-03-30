var React = require('react');
import { Table, message, Spin } from 'antd'
import CodeClass from './codeClass'
import styles from './sqlDemo.less'
import querystring from 'querystring'

// 编辑器实例
let editor = null

class Code extends React.Component {
  state = {
    result: [],
    errorInfo: '',
    loading: false
  }
  formate = () => {
    editor.setValue(editor.formate())
  }
  clear = () => {
    editor.setValue('')
    this.clearResult()
  }
  clearResult = ()=>{
    this.setState({
      result:[]
    })
  }
  filterKey = (obj) => {
    return obj ? Object.keys(obj) : []
  }
  showLoading = (flag) => {
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
      scriptStr: editor.formate(),
      scriptType: 'MYSQL'
    }
    const url = '/debug/script.execute'
    this.showLoading(true)
    this.clearResult()
    const data = await this.request(url, params)
    this.showLoading(false)
    message.success('请求成功')
    if (data.code == -1) {
      this.setState({
        errorInfo: data.msg
      })
    } else if (data.code == 200) {
      this.setState({
        result: data.data,
        errorInfo: ''
      })
    } else {
      message.error(data.msg)
    }
  }

  init = () => {
    editor = new CodeClass({
      id: 'sql_editor',
      mode: 'sql',
      options: {
        theme: 'default'
      }
    })
    editor.setValue(`SELECT * from student`)
  }
  componentDidMount() {
    this.init()
  }

  render() {
    const { result, errorInfo, loading } = this.state
    const columns = this.filterKey(result[0]).map(item => ({
      title: item,
      dataIndex: item
    }))
    const dataSource = result
    return <div className={styles.sql_editor}>
      <div className={styles.tool_bar}>
        <span className={styles.tool_btn} onClick={this.runtime}>运行</span>
        <span className={styles.tool_btn} onClick={this.formate}>格式化</span>
        <span className={styles.tool_btn} onClick={this.clear}>清除</span>
        <span style={{ float: 'right', color: '#000', lineHeight: '34px', marginRight: 5 }}>sql在线编辑器</span>
      </div>
      <div className={styles.editor_content}>
        <div id='sql_editor' style={{ height: '100%' }}></div>
      </div>
      {errorInfo
        && <div className={styles.error}>
          {errorInfo}
        </div>}
      <Spin spinning={loading} tip="请求数据中...">
        <Table rowKey='id' columns={columns} dataSource={dataSource} size="middle" pagination={false} />
      </Spin>
    </div>
  }
}

export default Code
