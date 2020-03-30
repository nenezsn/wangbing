import React from 'react'
import { dobounce } from './util'
import CodeClass from './codeClass'
import $ from 'jquery'
import styles from './jsDemo.less'
var initVal = `<div style='color:red'>在此编辑代码，左侧查看运行效果</div>`
let editor = {}
let ed = {}
class Codejs extends React.Component {
  state = {

  }
  createFreame = () => {
    const div = document.getElementById('preview')
    $('<iframe id="myFrame" width="600px" height="400px" style="border:none"  ></iframe>').appendTo($(div));
    var o = document.getElementById("myFrame");
    ed = document.all ? o.contentWindow.document : o.contentDocument;
  }
  runtime = () => {
    this.resetContent(editor.getValue())
  }
  resetContent = (val) => {
    ed.open();
    ed.write(val);
    ed.close();
    ed.contentEditable = true;
    ed.designMode = 'on';
  }
  clear = () => {
    editor.setValue('')
  }
  init = () => {
    editor = new CodeClass({
      id: 'code_js',
      mode: 'xml',
      options: {
        theme: 'default',
        lineWrapping: false
      }
    })
    editor.setValue(initVal)
    this.createFreame()
    this.runtime()
  }
  componentDidMount() {
    this.init()
    const run = dobounce(this.runtime,2000)
    editor.codeEditor.on('change',()=>{
      run()
    })
  }
  render() {
    return <div className={styles.js_editor} style={{ width: 1200, margin: '40px auto' }}>
      <div className={styles.left}>
        <div className={styles.toolbox}>效果预览</div>
        <div id='preview' style={{ float: 'left' }}></div>
      </div>
      <div className={styles.right}>
        <div className={styles.toolbox}>
          <span className={styles.btn} onClick={this.runtime}>运行</span>
          <span className={styles.btn} onClick={this.clear}>清除</span>
        </div>
        <div id='code_js' style={{ height: '100%' }}></div>
      </div>
    </div>
  }

}
export default Codejs
