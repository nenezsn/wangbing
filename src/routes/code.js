var React = require('react');
import { Radio } from 'antd'
import CodeSql from '../components/sqlDemo'
import Codejs from '../components/jsDemo'
import CodePython from '../components/pythonDemo'
class Code extends React.Component {
  state = {
    val: 'python'
  }
  onChange = (e) => {
    this.setState({
      val: e.target.value
    })
  }
  render() {
    const { val } = this.state
    return <div>
      <div style={{ width: 250, margin: '30px auto' }}>
        <Radio.Group onChange={this.onChange} value={val}>
          <Radio.Button value="sql">sql</Radio.Button>
          <Radio.Button value="python">python</Radio.Button>
          <Radio.Button value="html">html</Radio.Button>
        </Radio.Group>
      </div>
      {val == 'python' && <CodePython />}
      {val == 'sql' && <CodeSql />}
      {val == 'html' && <Codejs />}
    </div>
  }
}

export default Code
