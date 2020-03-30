/**
 * @author wangbing
 * @description 读取本地的文件名生成excel
 */

const fs = require('fs') //文件处理
const Excel = require('exceljs/modern.nodejs');

//创建工作簿
var workbook = new Excel.Workbook();

// 基本的创建信息
workbook.creator = "Me";
workbook.lastModifiedBy = "Her";
workbook.created = new Date(1985, 8, 30);
workbook.modified = new Date();
workbook.lastPrinted = new Date(2016, 9, 27);

// 视图大小， 打开Excel时，整个框的位置，大小
workbook.views = [
    {
        x: 0,
        y: 0,
        width: 1000,
        height: 2000,
        firstSheet: 0,
        activeTab: 1,
        visibility: "visible"
    }
];

// 标签创建
var worksheet = workbook.addWorksheet("第一个标签",{properties:{tabColor:{argb:'FFC0000'}}});

// 遍历标签
workbook.eachSheet((worksheet, sheetId) => {
    console.log("标签ID：", sheetId)
})


worksheet.getRow(5).font = { size: 14, bold: true };

worksheet.getCell("A2").value = "Site";
worksheet.getCell("A2").font = {
    color: { argb: "FF00FF00" },
    family: 2,
    size: 14,
    italic: true,
    bold: true
};
var firstSheet = workbook.getWorksheet(1);
console.log("标签信息-id", firstSheet.id);
console.log("获取总的：行/实际行 /列/实际列 个数： ", firstSheet.rowCount, firstSheet.actualColumnCount, firstSheet.columnCount, firstSheet.actualColumnCount);

// save workbook to disk
workbook.xlsx.writeFile("first.xlsx").then(function() {
    console.log("saved");
});



