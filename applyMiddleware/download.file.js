/**
 * @desc 将文件下载到服务器 再转发给前端
 * 弃用
 */
const download = require('pbu-down-file')
app.use('/download_resource', download(path.resolve(__dirname, './upload')))

/**
 * 代理请求，在返回前，处理响应头
 */
const pbu_download = require('pbu-proxy-resource')
app.use('/oss',pbu_download)