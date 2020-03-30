module.exports =  {
    '/api': {
        target: 'http://localhost:6080',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
            '^/api': ''
        }
    },
    '/test': {
        target: 'https://tapi.seentao.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
            '^/test': ''
        }
    },
    '/debug': {
        target: 'http://10.10.16.89:8091',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
            '^/debug': ''
        }
    },
    '/prod': {
        target: 'https://api.seentao.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
            '^/prod': ''
        }
    },
    'dev': {
        target: 'localhost:3000',
        changeOrigin: true
    },
    '/yonyou':{
        target: 'https://ezone.diwork.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
            '^/yonyou': ''
        }
    }
}