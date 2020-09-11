/**
 * @description 上传文件的多种实现方式
 */
import React from "react";
import $ from 'jquery'
import { Upload, Button } from 'antd'
export default class name extends React.Component {
    state={
        imgUrl:''//上传返回的图片
    }
    upload = (e) => {
        // 实现进度条的效果
        var xhrOnProgress = function (fun) {
            xhrOnProgress.onprogress = fun; //绑定监听
            //使用闭包实现监听绑
            return function () {
                //通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
                var xhr = $.ajaxSettings.xhr();

                //判断监听函数是否为函数
                if (typeof xhrOnProgress.onprogress !== 'function') {
                    return xhr;
                }

                //如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
                if (xhrOnProgress.onprogress && xhr.upload) {
                    xhr.upload.onprogress = xhrOnProgress.onprogress;
                }
                return xhr;
            }
        }
        //    let form =  document.getElementById('file_upload')
        const fileList = document.getElementById('mult')
        let fd = new FormData()
        Array.from(fileList.files).forEach((file) => {
            fd.append('img', file);
        });
        fd.append('key', 'wangbing')
        $.ajax({
            url: "/mult_upload",
            type: "POST",
            data: fd,
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
            xhr: xhrOnProgress(function (e) {
                console.log('e', e)
                var percent = e.loaded / e.total;//计算百分比
                console.log('111', percent);
            }),
            success: function (response, status, xhr) {
                console.log('上传成功');
            }
        });
    }
    uploadChange = (e) => {
        console.log('uploadChange', e)
        if (e.file.status == 'done') {
            this.uploadSuccess(e.file.response)
        }
    }
    uploadBefore = (e) => {
        console.log('uploadBefore', e)
    }
    uploadSuccess = (e) => {
        console.log('uploadSuccess', e)
        this.setState({
            imgUrl:e.url
        })
    }
    submit=()=>{
        let fd = new FormData()
        fd.append('key', 'wangbing')
        window.fetch()
        $.ajax({
            url: "/submit",
            type: "POST",
            data: fd,
            success: function (response, status, xhr) {
                console.log('上传成功');
            }
        });
    }
    render() {
        return (
            <div >
                {/* form表单上传 */}
                <form action="/upload" method="POST" encType='multipart/form-data' target="nm_iframe">
                    <input type="file" name='img' />
                    <input type="submit" value='上传文件' />
                </form>
                {/* ajax上传 */}
                <form id='file_upload'>
                    <input id='mult' type="file" name='img' onChange={(e) => { this.upload(e) }} multiple='multiple' />
                </form>
                {/* 防止表单跳转问题 */}
                <iframe id="id_iframe" name="nm_iframe" style={{ display: 'none' }}></iframe>
                {/* 蚂蚁组件的上传 */}
                < Upload
                    name='img'
                    action='/upload'
                    data={{
                        name: 'wanbing'
                    }}
                    onChange={this.uploadChange}
                    beforeUpload={this.uploadBefore}
                    showUploadList={true}
                    multiple={true}
                ><Button>上传</Button><img src={this.state.imgUrl} /></Upload>
                <Button onClick={this.submit}>提交</Button>
            </div>
        )
    }

}