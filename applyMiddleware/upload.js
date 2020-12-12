/**
 * @author wangbing
 * @description minor上传中间件
 * @description 资产环境统一放在pbu-public
 */

var Minio = require('minio')

function modules(moduleName) {
    return moduleName.replace(/_/g, '-').toLocaleLowerCase()
}

/**
 * 根据功能模块生成上传路径
 * @param  {[type]} moduleName [description]
 * @param  {[type]} basePath   [description]
 * @return {[type]}            [description]
 */
function pathOfModule(moduleName, basePath, userId, name) {
    //头像不需要时间戳
    if (moduleName == 'AVATAR_USER') {
        return `${basePath}/${userId}/${modules(moduleName)}/${name}`;
    }
    return `${basePath}/${userId}/${modules(moduleName)}/${Date.now()}/${name}`;
}

module.exports = function (minioConfig) {
    return function (req, res, next) {
        if (req.path != '/presignedUrl') {
            return next()
        }
        var minioClient = new Minio.Client({
            endPoint: minioConfig.endPoint,
            port: minioConfig.port,
            useSSL: false,
            accessKey: minioConfig.accessKey,
            secretKey: minioConfig.secretKey
        });
        const upload_key = pathOfModule(req.body.moduleName, minioConfig.basePath, req.body.userId, req.body.name)
        minioClient.presignedPutObject('pbu-public', upload_key, (err, url) => {
            if (!err) {
                res.json({
                    code: 200,
                    url
                })
            } else {
                res.json({
                    code: -1,
                    errMsg: err
                })
            }
        })
    }
}
