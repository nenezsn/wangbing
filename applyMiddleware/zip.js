var zip = new require('node-zip')();

// 用于压缩文件
fs.readFile("./server.js", "utf-8", function (err, data) {
    if (err) throw err;
    zip.file("./server.js", data);
    var bufferData = zip.generate({ base64: false, compression: 'DEFLATE' });
    fs.writeFileSync("result.zip", bufferData, 'binary');
});