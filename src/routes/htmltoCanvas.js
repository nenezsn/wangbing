import React from 'react';
import { Button } from 'antd'
import html2canvas from 'html2canvas'
import $ from 'jquery'
function downloadFile(url, name) {
    var a = document.createElement("a")
    a.setAttribute("href", url)
    a.setAttribute("download", name)
    a.setAttribute("target", "_blank")
    let clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("click", true, true);
    a.dispatchEvent(clickEvent);
}

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

class Index extends React.Component {
    toUpload = () => {
        html2canvas(document.querySelector("#capture"), { x: 100 }).then(canvas => {
            var dataUrl = canvas.toDataURL("image/png");
            const myBlob = dataURLtoBlob(dataUrl)
            var myUrl = URL.createObjectURL(myBlob)
            console.log('dataUrl', dataUrl)
            console.log('myBlob', myBlob)
            console.log('myUrl', myUrl)
            let fd = new FormData()
            let files = new File([myBlob],'文件图片.png',{type:myBlob.type})
            fd.append('img', files);
            // downloadFile(myUrl)
            $.ajax({
                url: "/upload",
                type: "POST",
                data: fd,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                success: function (response, status, xhr) {
                    console.log('上传成功');
                }
            });
        });
    }
    render() {
        return <div>
            <div id="capture" style={{ padding: '10px', background: '#f5da55' }}>
                <h4 style={{ color: '#000' }}>Hello world!</h4>
            </div>
            <Button onClick={this.toUpload}>开始上传</Button>
        </div>
    }
}
export default Index