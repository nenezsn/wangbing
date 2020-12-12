import html2canvas from 'html2canvas'

export function downloadFile(url, name) {
    var a = document.createElement("a")
    a.setAttribute("href", url)
    a.setAttribute("download", name)
    a.setAttribute("target", "_blank")
    let clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("click", true, true);
    a.dispatchEvent(clickEvent);
}
// dataUrl转换成blob
export function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

export function downloadFileByBase64(base64, name) {
    var myBlob = dataURLtoBlob(base64)
    var myUrl = URL.createObjectURL(myBlob)
    downloadFile(myUrl, name)
}

/**
 * 
 * @param {*} dom 需要截取的dom节点
 * @param {*} type 输出类型 blob 流  dataUrl base64地址
 */
export async function htmlConverCanvas(dom, type, options) {
    options = {
        useCORS: true, //需要服务器明确加上access-allow-origin:*
        allowTaint:true,
        // x:10,
        width:100,
        height:100,
        backgroundColor:'transparent',
        ...options
    }
    const canvas = await html2canvas(dom, options)
    if (type == 'blob') {
        const blob = await new Promise((resolve, reject) => {
            canvas.toBlob(data => {
                resolve(data)
            })
        })
        return blob
    }
    if (type == 'dataUrl') {
        return canvas.toDataURL("image/png")
    }
    return canvas.toDataURL("image/png")
}