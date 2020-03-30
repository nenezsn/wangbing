// 拷贝oss文件到本地

const downOSSFile = require('copy-oss-file')
downOSSFile({
    region: '--',
    accessKeyId: '--',
    accessKeySecret: '--',
    bucket: 'pbu-public',
    filepath:'webapps/default_images/',
    savepath:path.resolve(__dirname)+'/',
    limit:20,
})