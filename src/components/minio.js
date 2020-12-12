/**
 * @author wangbing
 * @description 文件上传(!!!！注意必填参数，添加扩展属性在下面注明!!!!)
 */
import React from 'react';
import { Upload, message } from 'antd';
import querystring from 'querystring';


class UploadFile extends React.Component {
    state = {
        uploadParams: {
            key: "${filename}"
        },
        fileArray: [],//批量上传的文件信息
        dir:''
    }

    handleChange = (info) => {
        console.log("info", info,t);
        let host = this.props.uploadUrl;
        if (info.file.status === 'done') {
            // 避免setState的异步特性，导致批量上传数据错乱
            const file = this.state.fileArray.find(item => item.uid == info.file.uid)
            this.props.onUploadSuccess(`${host}/${file.key}`, info.file.name, info.file.type, info.file, info.fileList);
        } else if (info.file.status === 'error') {
            message.error('上传失败！！', 1);
            this.props.onUploadFail(info.file)
        } else if (info.file.status === 'removed') {
            message.success('文档已移除！！', 1);
            this.props.onRemoveSuccess(info.file.uid);
        }
    }

    beforeUpload = (file, fileList) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: querystring.stringify({ moduleName: "COURSE", userId: '123', name: file.name })
        }
        return fetch(`/presignedUrl`, options).then(res => res.json()).then(data => {
            console.log('data',data)
            this.props.onUploading(file);
            const { fileArray } = this.state
            fileArray.push({
                name: file.name,
                uid: file.uid,
                key: `${data.dir}/${file.name}`
            })
            this.setState({
                fileArray,
                dir:data.url,
                // uploadParams: file
            })
        }).catch((e) => {
            console.error(e);
        });

    }

    render() {
        console.log('dir',this.state.dir)
        return (
            <Upload
                name={'file'}
                action={this.state.dir}
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
                data={this.state.uploadParams}
                showUploadList={true}
                method='PUT'
            >
                {
                    React.Children.map(this.props.children, children => {
                        return children
                    })
                }
            </Upload>
        );
    }
}
UploadFile.defaultProps = {
    uploadUrl: '',
    onBeforeUpload: () => { return false },
    onUploading: () => { },
    onUploadSuccess: () => { },
    onUploadFail: () => { },
    onRemoveSuccess: () => { },
    moduleName: '',
    multiple: false,
    show: false,
    studentName:''
}
export default UploadFile;
