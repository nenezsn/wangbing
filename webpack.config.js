let path = require('path')
let webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// 压缩css的时候 会导致js的mode：production的压缩效果失效 所以需要时用uglifyjs
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
// 终端输出进度条
const WebpackBar = require('webpackbar')
// 显示编译时间
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const chalk = require('chalk');
// 开启多个进程
const HappyPack = require('happypack');
const theme = require('./src/theme.js')
const proxys = require('./proxy.js')
function devserver() {
    return {
        devServer: {
            progress: true,
            contentBase: './dist',
            compress: true,
            historyApiFallback: true,
            proxy: proxys,
            clientLogLevel: "none" //关闭webpack控制台输出
        }
    }
}   
function entryAndOutput() {
    return {
        entry: './src/index.js',
        output: {
            filename: '[name].[hash:8].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/' //打包后的文件路径前缀
        }
    }
}
function optimization() {
    return {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    common: {
                        chunks: "all",
                        test: /[\\/]src[\\/]/,
                        name: "common", // 生成文件名，依据output规则
                        minChunks: 3,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 1
                    }
                }
            },
            minimizer: [
                new OptimizeCSSAssetsPlugin(),
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                })
            ]
        }
    }
}
function externals() {
    return {
        externals: {
            //防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
            // jquery: '$'
        }
    }
}
function resolve() {
    return {
        resolve: {
            modules: [path.resolve('node_modules')],
            extensions: ['.jsx', '.js'],
            alias: {
                "@routes": path.resolve(__dirname, 'src/routes'),
                '@components': path.resolve(__dirname, 'src/components'),
            }
        }
    }
}
function plugins() {
    return {
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html',
                minify: {
                    removeAttributeQuotes: true, //去掉某些属性的双引号
                    collapseWhitespace: true //变成一行
                },
                hash: true
            }),
            // new MiniCssExtractPlugin({
            //     filename: "[name].[hash].css",
            //     chunkFilename: "[id].css",
            // }),
            // 可以将jquery注入到每一个模块当中  但不是挂载在window下
            // new webpack.ProvidePlugin({
            //     $: 'jquery'
            // }),
            new CleanWebpackPlugin(),
            // 移除moment其他的语言包
            new MomentLocalesPlugin({
                localesToKeep: ['en'],
            }),
            new HappyPack({
                id: 'js',
                use: ['babel-loader?cacheDirectory=true']
            }),
            new HardSourceWebpackPlugin(),
            new webpack.DefinePlugin({
                'ENV': JSON.stringify('dev')
            }),
            new ProgressBarPlugin({
                format:
                    'build [:bar]' +
                    chalk.green.bold(':percent') +
                    ' (:elapsed)',
                width: 40
            }),
            new WebpackBar(),
            // new BundleAnalyzerPlugin()
        ]
    }
}
function moduleRules() {
    const mdRules = { rules: [] }
    mdRules.noParse = /jquery/
    mdRules.rules.push({
        test: /\.(js|jsx)$/,
        use: 'HappyPack/loader?id=js',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
    })
    mdRules.rules.push({
        test: /\.css$/,
        loader: [
            'style-loader',
            'css-loader'
        ]
    })
    mdRules.rules.push({
        test: /\.less$/,
        include: /node_modules/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'less-loader',
                options: {
                    modifyVars: theme,
                    javascriptEnabled: true
                }
            }
        ]
    })
    mdRules.rules.push({
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
            'style-loader',
            // MiniCssExtractPlugin.loader, 
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName:'[local]___[hash:base64:5]'
                }
            },
            'postcss-loader',
            {
                loader: 'less-loader',
                options: {
                    javascriptEnabled: true
                }
            }
        ]
    })

    mdRules.rules.push({
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
            loader: 'url-loader',
            options: {
                limit: 8 * 1024,   //小于10k的 会打包成base64 大于的会默认交给file-loader处理 依赖file-loader
                outputPath: 'image/', //图片默认放在这个路径下
                // publicPath:'/', //可以给图片单独加路径
                fallback: {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[hash:8].[ext]'
                    }
                }
            }
        }
    })
    return {
        module: mdRules
    }
}

module.exports = function (webpackConfig, env) {
    webpackConfig = {}
    // 出口入口配置
    Object.assign(webpackConfig, entryAndOutput())
    // 服务相关
    Object.assign(webpackConfig, devserver())
    // 优化
    Object.assign(webpackConfig, optimization())
    // 扩展
    Object.assign(webpackConfig, externals())
    // 解析
    Object.assign(webpackConfig, resolve())
    // 插件
    Object.assign(webpackConfig, plugins())
    // loader
    Object.assign(webpackConfig, moduleRules())

    webpackConfig.mode = 'development'
    // webpackConfig.mode = 'production'

    webpackConfig.devtool = 'source-map'

    return webpackConfig
}
/**
 * @description webpack4的生产模式自带的优化
 * tree shaking 和 提示作用域。
 */