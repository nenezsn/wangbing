/**
 * @desc bug日志的增删改查
 */

const fs = require('fs') //文件处理
const path = require('path')

module.exports = function (req, res, next) {
    if (req.path == '/addDebug') {
        fs.stat('./dist/logs/debug.txt', (err, data) => {
            if (err) {
                fs.mkdir('./dist/logs', err => {
                    if (!err) {
                        fs.appendFile('./dist/logs/debug.txt', `${new Date()}:添加bug文件成功 \n `, err => { })
                        console.log('创建成功')
                        res.send('添加成功')
                        next()
                    }
                })
            } else {
                console.log('我没报错')
                fs.appendFile('./dist/logs/debug.txt', `${new Date()}:进入3000端口,开始统计 \n `, err => {
                    if (!err) {
                        res.send('添加成功')
                    }
                })
            }
        })
    } else if (req.path == '/checkDebug') {
        fs.readFile('./dist/logs/debug.txt', 'utf8', (err, data) => {
            console.log('data', data)
        })
        res.sendFile(path.resolve('./dist/logs/debug.txt'), {
            headers: {
                'Content-Type': 'text/plain;charset=utf8'
            }
        })
    } else if (req.path == '/deleteDebug') {
        fs.unlink('./dist/logs/debug.txt', err => {
            if (err) throw err
            res.send('删除成功')
        })
    } else if (req.path == '/downloadDebug') {
        res.download('./dist/logs/debug.txt')
    } else if(req.path == '/err'){
        fs.appendFile('./dist/logs/debug.txt', req.body.err, err => {
            res.json({
                code: 200,
                msg: '成功'
            })
        })
    } else {
        next()
    }

}