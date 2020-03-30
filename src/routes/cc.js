import React from 'react'
const md5 = require('blueimp-md5');

function genThqs(url, query) {
    const thqs = Object.keys(query).sort().map((item) => {
        return `${encodeURIComponent(item)}=${encodeURIComponent(query[item])}`;
    }).join('&');
    const time = Math.floor(Date.now() / 1000);
    const hash = md5(`${thqs}&time=${time}&salt=HViuiVMwWtenA5nFjWpIkBa7Z9p4vnd8`);
    return `${url}?${thqs}&time=${time}&hash=${hash}`;
}

class CC extends React.Component {
    // 获取聊天
    getChat = (num) => {
        const url = 'http://api.csslcloud.net/api/live/chatmsg'
        const query = {
            userid: '86139F5426B36EE3',
            liveid: '8FD4B9E40B0BB751',
            roomid: '605EFD47C1EBD7019C33DC5901307461',
            pagenum: 100,
            pageindex: num,
        };
        const requestUrl = genThqs(url, query)
        return new Promise(resolve=>{
            fetch(requestUrl).then(data=>data.json()).then(data=>{
                resolve(data)
            })
        })
    }
    //参与人员
    getMembers = ()=>{
        const url = 'http://api.csslcloud.net/api/statis/room/useraction'
        const query = {
            roomid: '605EFD47C1EBD7019C33DC5901307461',
            userid: '86139F5426B36EE3',
            starttime:'',
            endtime:'',
            action:0,
            pagenum: 100,
            pageindex: 1,
        };
        const requestUrl = genThqs(url, query)
        return new Promise(resolve=>{
            fetch(requestUrl).then(data=>data.json()).then(data=>{
                resolve(data)
            })
        })
    }
    // 访问记录
    getVisiter=(num)=>{
        const url = 'http://api.csslcloud.net/api/statis/live/useraction'
        const query = {
            userid: '86139F5426B36EE3',
            liveid: '8FD4B9E40B0BB751',
            pagenum: 1000,
            pageindex: num,
        };
        const requestUrl = genThqs(url, query)
        return new Promise(resolve=>{
            fetch(requestUrl).then(data=>data.json()).then(data=>{
                resolve(data)
            })
        })
    }
    // 获取正在直播的列表
    getLiveing = ()=>{
        const url = 'http://api.csslcloud.net/api/rooms/broadcasting'
        const query = {
            userid: '86139F5426B36EE3'
        }
        console.log('2222',genThqs(url, query))
    }
    // 获取直播的统计信息
    // 去重
    filterRepeatItem=(list,key)=>{
        let hash = {}
        list = list.reduce((preVal, curVal) => {
            hash[curVal[key]] ? '' : hash[curVal[key]] = true && preVal.push(curVal); 
            return preVal 
        }, [])
        return list
    }
    componentDidMount () {
        // 获取本场直播的参观人数
        // Promise.all([this.getVisiter(1),this.getVisiter(2),this.getVisiter(3),this.getVisiter(4)]).then(data=>{
        //    let arr = []
        //     data.map(item=>{
        //             arr = arr.concat(item.userEnterLeaveActions)
        //     })
        //    let list =  this.filterRepeatItem(arr,'viewerName')
        // })
        // this.getLiveing()
    }   
    render() {
        return <div></div>
    }
}
export default CC