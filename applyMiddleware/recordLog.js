//  日志记录
const {recordLog,checkLog} = require('pbu-node-logger')
app.use(checkLog(path.resolve(__dirname,'./log.txt')))
app.use(recordLog('1111',path.resolve(__dirname,'./log.txt')))