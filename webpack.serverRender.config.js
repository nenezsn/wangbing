const path = require('path')

module.exports={
    entry: path.resolve(__dirname, './serverPage/component.jsx'),
    output: {
        path: path.resolve(__dirname, 'serverDist'),
        filename: 'index.js',
        chunkFilename: '[name].[hash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // 这里一定不要用引号把它包括起来，写成'/\.js$/' 
                loader: [{
                    loader: 'babel-loader'
                }]
            }
        ]
    }

}