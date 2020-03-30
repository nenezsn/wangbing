const crypto = require('crypto')//处理加密
const request = require('request') //请求
// const md5 = require('blueimp-md5');//其实跟crypto一样

function md5(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}
function handlePost(req,res,next){
    if(req.path == '/getCcVideoInfo'){
        const q = {
            userid: 'BA2F0748E72D9B04',
            videoid: '5521FF4628A959C29C33DC5901307461',
            format: 'json'
        }
        const qs = Object.keys(q).sort().map(item => {
            return `${encodeURIComponent(item)}=${encodeURIComponent(q[item])}`
        }).join('&')
        const time = Math.floor(Date.now() / 1000);
        const salt = 'RQiDG9DnRZlcZ06SmDDiPUQmbfsItlRs'
        const hash = md5(`${qs}&time=${time}&salt=${salt}`)
        const qf = `${qs}&time=${time}&hash=${hash}`
        request(`http://spark.bokecc.com/api/video/v5?${qf}`,(err,responce,body)=>{
                if(err){
                    throw new Error(err)
                }
                const result = JSON.parse(body)
                res.json(result)
        })
    }else if (req.path == '/getCcLiveInfo'){
        const q = {
            roomid: '795103208893D9129C33DC5901307461',
            userid: '98662EBA220C0D82',
            starttime: '2019-01-06 12:30:00',
            endtime:'2019-01-09 12:30:00'
        }
        const qs = Object.keys(q).sort().map(item => {
            return `${encodeURIComponent(item)}=${encodeURIComponent(q[item])}`
        }).join('&')
        const time = Math.floor(Date.now() / 1000);
        const salt = 'mpLR3bMBIZaVfFCFxqnzqF4zXgPTOgb8'
        const hash = md5(`${qs}&time=${time}&salt=${salt}`)
        const qf = `${qs}&time=${time}&hash=${hash}`
        request(`http://api.csslcloud.net/api/statis/useraction?${qf}`,(err,responce,body)=>{
                if(err){
                    throw new Error(err)
                }
                const result = JSON.parse(body)
                res.json(result)
        })
    }else{
        next()
    }
}
module.exports.getCc = function (req, res, next) {
    switch (req.method) {
        case 'POST':
            return handlePost(req,res,next)
            break;
        case 'GET':
            next()
            break;
        default:
            next()
    }
}