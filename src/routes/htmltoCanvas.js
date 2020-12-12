import React from 'react';
import { Button } from 'antd'
import { downloadFile, dataURLtoBlob, downloadFileByBase64, htmlConverCanvas } from '../util/html2Canvas'
import $ from 'jquery'

// const imgUrl = 'http://localhost:6080/lOGO@2x.jpeg'
const imgUrl = require('..//assets/lOGO@2x.jpeg')
class Index extends React.Component {
    toUpload = async () => {
        const dataUrl = await htmlConverCanvas(document.querySelector("#capture"))
        const myBlob = dataURLtoBlob(dataUrl)
        var objectUrl = URL.createObjectURL(myBlob)
        // this.refs.img.src=objectUrl

        console.log('dataUrl', dataUrl)
        console.log('myBlob', myBlob)
        console.log('objectUrl', objectUrl)
        let fd = new FormData()
        let files = new File([myBlob], '文件图片.png', { type: myBlob.type })
        fd.append('img', files);
        // console.log('fd',fd.values().next())
        console.log('files', files)
        const reader = new FileReader()
        reader.readAsDataURL(myBlob)
        reader.onload = () => {
            this.refs.img.src = reader.result
        }

        // console.log('reader',reader)
        // downloadFile(objectUrl)
        // downloadFile(dataUrl)

        // $.ajax({
        //     url: "/upload",
        //     type: "POST",
        //     data: fd,  //$.ajax配合formDate使用 
        //     processData: false,  // 告诉jQuery不要去处理发送的数据
        //     contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
        //     success: function (response, status, xhr) {
        //         console.log('上传成功');
        //     }
        // });
    }
    imgUrlToCanvas = () => {
        let image = new Image()
        image.crossOrigin = 'Anonymous'//需要服务器明确加上access-allow-origin:*
        image.onload = function () {
            const canvas = document.getElementById('cvs')
            const ctx = canvas.getContext('2d')
            canvas.height = image.height
            canvas.width = image.width
            ctx.drawImage(image, 100, 100)
            const dataurl = canvas.toDataURL('image/jpg')
            console.log('图片加载完成', dataurl)
        }
        image.src = imgUrl
    }
    componentDidMount() {
        const input = document.querySelector('input[type=file]')
        input.addEventListener('change', () => {
            const reader = new FileReader()
            console.log('22222',input.files)
            reader.readAsText(input.files[0], 'gb2312') // input.files[0]为第一个文件
            reader.onload = () => {
                console.log('22',reader)
            }
        }, false)
    }
    render() {
        return <div>
            <input id="input" type="file" />
            <div id="capture" style={{ background: '#f5da55', width: 100, height: 100 }}>
                1234567890
                <img src={imgUrl} style={{ width: 50 }} />
            </div>
            <h5>生成后:</h5>
            <img style={{ width: 100, height: 100 }} ref='img' />
            <Button onClick={this.toUpload}>开始上传</Button>
            <canvas id='cvs'></canvas>
            {/* <img src={imgUrl} id='ppt'/> */}
            <Button onClick={this.imgUrlToCanvas}>图片转换成canvas</Button>
        </div>
    }
}
export default Index