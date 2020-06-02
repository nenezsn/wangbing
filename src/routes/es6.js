/**
 * Es6
 */
import React from 'react'
import { Button } from 'antd'
import styles from './index.less'
import co from 'co'

export default class name extends React.Component {

    test_promiseall = () => {
        let a = function (city) {
            return window.fetch('/api?city=' + city).then(res => res.json())
        }
        Promise.all(['唐山', '北京', '上海'].map(item => a(item))).then(data => {
            console.log('data', data)
        }).catch(err => {
            console.log('err', err)
        })
    }
    go = (data) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(data)
            }, 1000)
        })
    }
    generator = () => {
        let _this = this
        function* p() {
            console.log('1')
            yield _this.go(1);
            console.log('2')
            yield _this.go(2);
            console.log('3')
            return 3;
        }
        co(p)
    }
    test_co = () => {
        function delay(num) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(num + '秒到了')
                    console.log(num + '秒到了')
                }, num * 1000)
            })
        }
        let arr = [1, 2, 3]
        co(function* () {
            for (let i = 0; i < arr.length; i++) {
                let data = yield delay(arr[i])
            }
        })
    }
    test_async = async () => {
        function delay(num) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(num + '秒到了')
                    console.log(num + '秒到了')
                }, num * 1000)
            })
        }
        let arr = [1, 2, 3]
        for (let i = 0; i < arr.length; i++) {
            let data = await delay(arr[i])
        }
    }
    // 类似vue的数据拦截
    test_observer = () => {
        function observer(data) {
            if (typeof data != 'object') {
                return data
            }
            Object.keys(data).forEach(item => {
                defineReactive(data, item, data[item])
            })
        }
        function defineReactive(obj, key, value) {
            observer(value)
            Object.defineProperty(obj, key, {
                get: function () {
                    console.log('获取' + key)
                    return value
                },
                set: function (newval) {
                    console.log('设置' + key)
                    value = newval
                    return value
                }
            })
        }
        const obj = {
            name: '王冰',
            age: 23
        }
        observer(obj)
        obj.name
        obj.name = '王长'
    }
    render() {
        return (
            <div className={styles.box}>
                <Button onClick={this.test_promiseall}>测试promiseAll</Button>
                <Button onClick={this.generator}>使用co执行generator函数</Button>
                <Button onClick={this.test_co}>测试co</Button>
                <Button onClick={this.test_async}>测试async</Button>
                <Button onClick={this.test_observer}>数据拦截简单实现</Button>
            </div>
        )
    }
}
