var express = require('express');
var router = express.Router();
var dateV=new Date();
var timeStamp= 'v='+dateV.getFullYear()+(dateV.getMonth()+1)+dateV.getDate()+dateV.getHours()+dateV.getMinutes();
var multer  = require('multer');
var path  = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        var extname = path.extname(file.originalname);//获取文件扩展名
        // 将保存文件名设置为 字段名 + 时间戳+文件扩展名，比如 logo-1478521468943.jpg
        cb(null, file.fieldname + '-' + Date.now() + extname);
    }
});
var upload = multer({ storage: storage });

/* 登录 */
router.get('/login', function(req, res, next) {
console.log('登录', req.ip)

  res.render('login', {
    version :  timeStamp
   });
});

router.post('/user/login', function(req, res, next) {
var name=req.param('name');
var pwd=req.param('pwd');
var result={status:400,err_msg:'参数错误'};
if(name && pwd){
  if(name==='admin' && pwd==='12345'){
    result={
      status: 200,
      content: 'ko',
      err_msg: ''
    };
  }else{
    result={
      status: 401,
      content: '',
      err_msg: '账号或者密码错误'
    };
  }
}else{
  result={
    status: 402,
    content: '',
    err_msg: '账号和密码不能为空'
  };
}

  res.send(result)

});




/* 主页 */
router.get('/', function(req, res, next) {
  console.log('进来了', req.ip)

  if(!req.cookies.token){
    res.redirect('/login');
  }

  res.render('index', {
    version :  timeStamp
   });
});



/* 上传附件图片 */
router.post('/upload/*', function(req, res, next){
  if(req.cookies.token){
    return res.send({
      status: 400,
      err_msg: 'token 不合法'
    });
  }else{
    next();
  }
}).post('/upload/file',  upload.array("file", 3), function(req, res, next) {
  res.send({
      status: 200,
      content: '上传ok!',
      err_msg: ''
    });
});

Function.prototype.method=function(name,fn){
    if(!this.prototype[name]){
        this.prototype[name]=fn;
        return this;
    }
};


if(!Date.prototype.format){
    Date.prototype.format =function(format){
        var o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(), //day
            "h+" : this.getHours(), //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter
            "S" : this.getMilliseconds() //millisecond
        };
        if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
            (this.getFullYear()+"").substr(4- RegExp.$1.length));
        for(var k in o)if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length==1? o[k] :
                    ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
    };
}


module.exports = router;
