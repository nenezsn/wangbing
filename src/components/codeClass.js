var CodeMirror = require('codemirror/lib/codemirror.js');
//基础css
import 'codemirror/lib/codemirror.css';
// 主题
import 'codemirror/addon/display/fullscreen.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/eclipse.css'
import 'codemirror/theme/mdn-like.css'
// 提示
import 'codemirror/addon/selection/active-line' //光标所在行
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/sql-hint.js'
// 折叠
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/foldgutter.css'
// 模式
import 'codemirror/mode/python/python.js'// 高亮
import 'codemirror/mode/sql/sql.js'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/xml/xml'
// 格式化
import js_beautify from 'js-beautify' //通用
import sqlFormatter from "sql-formatter"; //sql

class CodePython {
    constructor(params) {
        this.checkParams(params)
        this.id = params.id;
        this.mode = params.mode
        this.codeEditor = null
        // options
        this.options = {
            mode: this.mode,
            theme: 'monokai',
            styleActiveLine: true,
            lineNumbers: true,//行数
            lineWrapping: true,//换行
            extraKeys: { "Ctrl-A": "autocomplete" },//自动完成
            foldGutter: true,//折叠
            matchBrackets: true,//括号匹配
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
        }
        if(params.options){
          Object.assign(this.options,params.options)
        }
        this.create()
    }
    // 格式化
    formate() {
        let content = this.getValue()
        if (this.mode == 'sql') {
            return sqlFormatter.format(content)
        } else {
            let options = {
                'indent_size': 2,
                'brace_style': 'end-expand',
                'keep_array_indentation': true,
            };
            return js_beautify(content, options)
        }
    }
    // 获取
    getValue() {
        return this.codeEditor.getValue();
    }
    // 设置
    setValue(value) {
        return this.codeEditor.setValue(value);
    }
    // 检查参数是否完整
    checkParams(params) {
        if (!params.id
            || !params.mode) {
            throw new Error('id,mode必填')
        }
        const dom = document.getElementById(params.id)
        if (!dom) {
            throw new Error('未找到id为' + params.id + '的容器')
        }
    }
    // 设置编辑器大小
    resize(height, width) {
        this.codeEditor.setSize('height', height)
        this.codeEditor.setSize('width', width)
    }
    // 创建
    create() {
        const dom = document.createElement('textarea')
        document.getElementById(this.id).appendChild(dom)
        this.codeEditor = CodeMirror.fromTextArea(dom, this.options)
        this.resize('100%', '100%')
    }
}
export default CodePython
