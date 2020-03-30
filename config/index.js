console.log('process.env.NODE',process.env.NODE_ENV)

if(process.env.NODE == 'production'){
    module.exports = require('./config.prod')
}else{
    module.exports = require('./config.dev')
}