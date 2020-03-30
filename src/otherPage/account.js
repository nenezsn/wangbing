import React from 'react';
import { Collapse } from 'antd';
import styles from './app.less'
const { Panel } = Collapse;

class Account extends React.Component {
    state = {
    }

    render() {
        return <div className={styles.account_box}>
            <Collapse accordion>
                <Panel header='办公账号' key="1">
                    <p>账号：wangbinge</p>
                    <p>密码：13930572037wb.</p>
                </Panel>
                <Panel header="cc相关账号" key="2">
                    <p>点播：测试环境 18515130737 Seentaouf123</p>
                    <p>点播：线上环境 18600547490 Seentaouf123  </p>
                    <p>直播：测试环境：13661271810 Seentaouf123 </p>
                    <p>直播：线上环境 18612203636 Seentaouf123</p>
                </Panel>
                <Panel header="oss" key="3">
                    <p>账号：seentao_pbu</p>
                    <p>密码：sCloud^^^</p>
                </Panel>
                <Panel header="新道云账号" key="4">
                    <p>院校管理：18612203636 123456 || admin008@aa.com 123456</p>
                    <p>运营后台：15810000001 123456</p>
                    <p>学生：a0028@aa.com 123456</p>
                    <p>教师：a0052@aa.com 123456</p>
                </Panel>
                <Panel header="gitlab" key="5">
                    <p>地址：http://seentao.git.yonyou.com/</p>
                    <p>账号：wangbinge</p>
                    <p>密码：13930572037wb.</p>
                    <p>地址：内网：10.10.16.101:8082 外网：125.35.5.233:8082</p>
                    <p>账号：pbu</p>
                    <p>密码：seentao*123$%^</p>
                </Panel>
                <Panel header="谷歌账号" key="6">
                    <p>账号：wangbinge139@gmail.com</p>
                    <p>密码：13930572037wb</p>
                </Panel>
                <Panel header="npm 账号 || IMWeb博客账号 || Docker账号" key="7">
                    <p>账号：wangbing139</p>
                    <p>密码：13930572037wb</p>
                </Panel>
                <Panel header="github" key="8">
                    <p>账号：1137717258@qq.com</p>
                    <p>密码：13930572037wb</p>
                </Panel>
                <Panel header="sf || mx" key="9">
                    <p>地址：http://fabu2019.host/</p>
                    <p>邮箱：3099835313@qq.com</p>
                    <p>账号：wangbinge || 1303282111 || a1303282111</p>
                    <p>密码：13930572037Wb</p>
                </Panel>
            </Collapse>
        </div>
    }
}

export default Account