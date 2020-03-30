/**
 * 使用sts临时授权访问oss资源
 */
let OSS = require('ali-oss');
let store = new OSS({
    bucket: '--',
    region: '--',
    accessKeyId: '****',
    accessKeySecret: '****'
})
const url = store.signatureUrl('yay.jpg',{
    expires:10
});
console.log('ur111l',url)