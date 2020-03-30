import React from 'react';
import { Collapse } from 'antd';
import styles from './app.less'
const { Panel } = Collapse;

class Address extends React.Component {
    state = {

    }
    render() {
        return <div className={styles.address_box}>
            <Collapse accordion>
                <Panel header='yonyou' key="1">
                    <a href="https://open.yonyoucloud.com/developer/doc?id=f81b96db8e3c9bc4e68ed43b4ff80a53" >yon_qzone文档中心</a>
                    <a href="https://ec.yonyoucloud.com/static/home.html#/?qzid=124418"  >yon_portal</a>
                    <a href="https://ec.yonyoucloud.com/static/setting.html#/apply/indexmix/classic?qzid=124418"  >yon_operation</a>
                </Panel>
                <Panel header='seentao' key="2">
                    <a href="http://xd.jira.yonyou.com/"  >jira</a>
                    <a href="http://seentao.git.yonyou.com/group_ser/pbu-web/pbu_portal/settings/repository"  >new gitlab</a>
                    <a href="http://125.35.5.233:8082/"  > old gitlab</a>
                    <a href="http://10.10.16.181:8080/share/page/context/shared/sharedfiles#filter=path%7C%2F%25u65B0%25u9053%25u4E91%25u5E73%25u53F0&page=1"  ></a>
                    <a href="http://39.107.8.110:8080/stest/" >假接口</a>
                    <a href="https://www.cnblogs.com/vinyuan/p/3556218.html"  >网页媒体播放利器 - JW Player使用心得 - VinYuan - 博客园</a>
                    <a href="http://www.jq22.com/jquery-info3465"  >jwplayer响应式多终端适配视频播放器</a>
                    <a href="https://tteacher.seentao.com/"  >新道云—教育服务都在这</a>
                    <a href="https://shimo.im/space/ze1Az4bZg4VhLqWG"  >石墨文档</a>
                    <a href="http://192.168.210.120/portal/pt/home/index?lrid=1"  >nc</a>
                    <a href="http://www.fuhaoku.com/tool/pinyin.html"  >汉字转拼音工具</a>
                    <a href="https://ec.diwork.com/static/home.html#/iframe?url=aHR0cHM6Ly9lYy5kaXdvcmsuY29tL2FwcC9hcHAvY2VydGlmaWVkL2lkLzE5MC9ZWVcvMS9WSVNJVElELzgxNzQ4"  >日报</a>
                    <a href="http://192.168.210.120/portal/app/mockapp/login.jsp?lrid=1"  >报销</a>
                    <a href="http://pan.yonyou.com/web/index.html#group/5224/218149980477980/%E8%BF%87%E7%A8%8B%E6%8E%A5%E5%8F%A3%E5%A4%87%E4%BB%BD/%E6%96%B0%E9%81%93%E7%A7%91%E6%8A%80-%E7%A0%94%E5%8F%91%E5%86%85%E9%83%A8/218149978898432/0.6497004058686098"  >文件管理</a>
                    <a href="http://10.16.61.3:8080/view/%E6%B5%8B%E8%AF%95-%E5%89%8D%E7%AB%AF/"  >测试-前端 [Jenkins]</a>
                    <a href="http://localhost:8000/CourseDetail?courseVersionId=26994786259435520&lastLearnComponentId=26994786283032578&lastLearnSectionId=26994786276216832&teachClassId=28985455121793024"  >新道云—教育服务都在这</a>
                </Panel>
                <Panel header='工具' key="3">
                    <a href="https://www.bejson.com/jsoneditoronline/"  >json</a>
                    <a href="http://fanyi.youdao.com/" >翻译</a>
                    <a href="http://tool.chinaz.com/Tools/unixtime.aspx"  >时间戳</a>
                    <a href="http://www1.tc711.com/tool/BASE64.htm" >base64</a>
                    <a href="https://www.processon.com/diagrams"  >ProcessOn</a>
                    <a href="http://tool.oschina.net/uploads/apidocs/jquery/regexp.html"  >正则手册</a>
                    <a href="http://www.w3school.com.cn/jsref/index.asp"  ></a>
                    <a href="http://jsbin.com/?html,output"  >js在线调试</a>
                    <a href="http://www.17sucai.com/pins/tag/5400.html"  >插件</a>
                    <a href="http://www.softwhy.com/article-6554-1.html"  >plus</a>
                    <a href="http://code.ybao.org/"  >online</a>
                    <a href="http://cnbtkitty.net/"  >BT Kitty</a>
                    <a href="http://www.bootcdn.cn/"  >CDN</a>
                    <a href="http://xinjipin.com/"  >会员</a>
                    <a href="http://10.10.16.141:8080/"  >Jenkins root seentao*123</a>
                    <a href="https://gallery.echartsjs.com/explore.html#sort=rank~timeframe=all~author=all"  >ECharts Gallery</a>
                    <a href="https://blog.csdn.net/Andrew83/article/details/80353489"  >前端实现在线预览pdf、word、xls、ppt等文件 - lishaoh的博客 - CSDN博客</a>
                    <a href="https://motion.ant.design/exhibition-cn/"  >Ant Motion</a>
                </Panel>
                <Panel header='框架' key="4">
                    <a href="https://reactnative.cn/docs/0.51/getting-started.html"  >react native</a>
                    <a href="https://cn.vuejs.org/v2/guide/"  >vue</a>
                    <a href="https://cn.mobx.js.org/"  >mobx</a>
                    <a href="https://vuex.vuejs.org/zh/guide/actions.html" >Vuex</a>
                    <a href="https://tencent.github.io/wepy/document.html#/" >wepy</a>
                    <a href="https://www.webpackjs.com/concepts/#%E5%85%A5%E5%8F%A3-entry-"  >webpack4</a>
                    <a href="http://www.redux.org.cn/"  >Redux</a>
                    <a href="https://router.vuejs.org/zh/" >VRouter</a>
                    <a href="https://finget.github.io/2018/06/28/vue-family/?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com"  >Vue 全家桶</a>
                    <a href="http://react.css88.com/"  > react 文档</a>
                    <a href="https://www.jianshu.com/p/89ed2a01a3db"  >Redux Saga</a>
                    <a href="https://codepen.io/gaearon/pen/ZpvBNJ?editors=0010"  >react在线</a>
                    <a href="https://koa.bootcss.com/" >Koa</a>
                    <a href="http://www.expressjs.com.cn/4x/api.html"  >express</a>
                    <a href="http://nodejs.cn/api/"  >Node.js</a>
                    <a href="https://nodejs.org/zh-cn/download/releases/"  >Node.js版本</a>
                    <a href="https://kairi1227.github.io/chapter03/04.html" >React 基础学习资料</a>
                    <a href="https://www.html.cn/doc/webpack2/concepts/entry-points/" >webpack2</a>
                    <a href="http://element.eleme.io/#/zh-CN/component/quickstart"  ></a>
                    <a href="https://dvajs.com/guide/#%E7%89%B9%E6%80%A7" >DvaJS</a>
                </Panel>
                <Panel header='微信' key="5">
                    <a href="https://open.yonyoucloud.com/developer/doc?id=f81b96db8e3c9bc4e68ed43b4ff80a53" >yon_qzone文档中心</a>
                    <a href="https://ec.yonyoucloud.com/static/home.html#/?qzid=124418"  >yon_portal</a>
                    <a href="https://ec.yonyoucloud.com/static/setting.html#/apply/indexmix/classic?qzid=124418"  >yon_operation</a>
                </Panel>
                <Panel header='oss' key="6">
                    <a href="https://oss.console.aliyun.com/bucket/oss-cn-beijing/pbu-public/object"  >控制台</a>
                    <a href="https://help.aliyun.com/document_detail/31947.html"  >开发文档</a>
                </Panel>
            </Collapse>
        </div>
    }
}
export default Address