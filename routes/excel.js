var path = require('path');
var xlsx = require('xlsx');
var fs = require('fs');

module.exports=function(filePath){

// 读取上传进来的excel文件，并解析
filePath=('./'+filePath)||'./uploads/test.xlsx';
var list=[];
//判断文件是否存在
if(fs.existsSync(filePath)){

  const workbook = xlsx.readFile(filePath, { });
  // 获取 Excel 中所有表名
  const sheetNames = workbook.SheetNames;
  console.log('sheetNames', sheetNames)
  // 根据表名获取对应某张表
  const worksheet = workbook.Sheets[sheetNames[0]];


  var workWidth= (worksheet['!ref'] ||'').split(':');
  if(2==workWidth.length){
    var start =workWidth[0].substr(0,1),
        end =workWidth[1].substr(0,1),
        rows=workWidth[1].substr(1);
console.log('worksheet',start, end ,rows)

  for (var i = 0; i < rows; i++) {
    var val=worksheet[start+(i+1)].v;
    //检测是否是email
    console.log('worksheet========',val)
    if(/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i.test(val)){
        console.log('worksheet========',val)
        list.push(val)
    }

  }
 

  }

}else{
  console.log(filePath,'文件不存在')
}

return list;



};
