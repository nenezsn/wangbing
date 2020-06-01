const express = require('express')
const superagent = require("superagent");
const cheerio = require("cheerio");
const https = require('https')

const app = express()
const url = 'http://www.cac.gov.cn/2018-12/27/c_1123911501.htm?from=timeline'

function crawler(url){
    return new Promise((resolve,reject)=>{
        superagent.get(url).end((err, res) => {
            if(err){
                reject(err)
                return 
            }
            var content = res.text;
            var $ = cheerio.load(content);
            resolve($('#BodyLabel').text())
        })
    })
}

function other(){
    return new Promise((resolve,reject)=>{
        https.get('https://www.baidu.com', function (res) {
            const buffer = []
            res.on('data', d => {
                buffer.push(d)
            })
            res.on('end', () => {
                const text = buffer.toString('utf-8');
                resolve(text)
            })
        })
    })
}


app.get('/',(req,res,next)=>{
    crawler(url)
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.send(err)
    })
})
app.get('/baidu',(req,res,next)=>{
    other(url)
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.send(err)
    })
})
app.get('*',(req,res)=>res.send(404))
app.listen(3000,()=>{
    console.log('server is runnging in localhost:3000')
})