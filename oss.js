/**
 * 使用sts临时授权访问oss资源
 */
// let OSS = require('ali-oss');
// let store = new OSS({
//     bucket: '--',
//     region: '--',
//     accessKeyId: '****',
//     accessKeySecret: '****'
// })
// const url = store.signatureUrl('yay.jpg',{
//     expires:10
// });
// console.log('ur111l',url)
const base64 = require('base-64');
let url = 'bWVtYmVyVHlwZT1TQ0hPT0xfQURNSU5JU1RSQVRPUiZzY2hvb2xOYW1lPSVFNiVCOCU4NSVFNSU4RCU4RSVFNSVBNCVBNyVFNSVBRCVBNiZzY2hvb2xJZD00ODEwMjQwODU0MDY1MTUyMCZzY2hvb2xVcmw9JUU2JUI4JTg1JUU1JThEJThFJUU1JUE0JUE3JUU1JUFEJUE2Jm9yZ0lkPTQ4MTAyNDA4NTQwNjUxNTIwJm9yZ1R5cGU9U0NIT09MJm1lbWJlcklkPTQ4MTA1NzQxNzA2MzMwMTEyJnNpZz0yYzEzN2NjMjEwMjZiMjNjOGQ3YTcxMWU0OWU1MGJhMw%3D%3D'
url = decodeURIComponent(url)
console.log('222',base64.decode(url))