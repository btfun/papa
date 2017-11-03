var express = require('express');
var router = express.Router();
var dateV=new Date();
var timeStamp= 'v='+dateV.getFullYear()+(dateV.getMonth()+1)+dateV.getDate()+dateV.getHours()+dateV.getMinutes();
var multer  = require('multer');
var path  = require('path');
var cheerio = require('cheerio');



/* 登录 */
router.get('/login', function(req, res, next) {
  res.render('login', {
    version :  timeStamp
   });
});


/* 主页 */
router.get('/', function(req, res, next) {
  console.log('cookies---',req.cookies)
  if(!req.cookies.token){
    return res.redirect('/login');
  }
  res.render('index', {
    version :  timeStamp
   });
});


/****
* 登录验证接口
*
*
*****/
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

/****
* 发送邮件接口
*
*
*****/
var nodemailer = require('nodemailer');
var conf = require("../conf");
var emailObj=conf.email;

router.post('/send/email', function(req, res, next) {

var emailFrom=req.param('from');
var content=req.param('content');
if(!emailFrom || !content){
  return res.send({
    status: 400,
    content: '',
    err_msg: '发送错误：参数有误'
  })
}

var transporter = nodemailer.createTransport({
    host: emailObj.host,
    port: emailObj.port,
    secure: false, // use SSL
    auth: {
        user: emailObj.user,
        pass: emailObj.pass
    }
});

const $ = cheerio.load(content);
var imgs=[];
$('img').each(function(i,e){
  var imgname=$(this).attr('src').split('/');
      imgname=imgname[imgname.length-1];
  var code=Math.random().toString(36).substr(2, 20);
  imgs.push({
    filename: imgname,
    path: 'uploads/'+imgname,
    cid : code
  })
  $(this).attr('src','cid:'+code)
})

/**
* 循环发送邮件 独立的事件中处理
*/

var mailOptions = {
    from: '"小蜜蜂 " <'+emailObj.user+'>', // sender address
    to: emailFrom,            // list of receivers
    subject: '您有一封新邮件！',        // Subject line
    text: $.text(),                    // plaintext body
    html: $.html(),                    // html body
    attachments : imgs
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log('=======================')
      console.log($.html())
      console.log( JSON.stringify(imgs))
      console.log('=======================')
      return res.send({
        status: 400,
        content: '',
        err_msg: '发送错误：'+error
      })
    }
    res.send({
      status: 200,
      content: info.response,
      err_msg: ''
    })
});





});


/****
* 上传附件图片接口
*
*
*****/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('--------====')
        cb(null, 'uploads');    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        var extname = path.extname(file.originalname)||'.png';//获取文件扩展名
        console.log('--------',extname)
        // 将保存文件名设置为 字段名 + 时间戳+文件扩展名，比如 logo-1478521468943.jpg
        cb(null, file.fieldname + '-' + Date.now() + extname);
    }
});
var upload = multer({ storage: storage });

router.post('/upload/*', function(req, res, next){
  if(!req.cookies.token){
    return res.send({
      ok: false,
      status: 400,
      msg: 'token 不合法'
    });
  }else{
    next();
  }
}).post('/upload/file',  upload.array("file", 3), function(req, res, next) {
  console.log('-------',req.files)


var list=[];
if(req.files){
  req.files.forEach((item)=>{
    list.push({
      destination: item.destination,
      filename: item.filename
    })

  })
}

  res.send({
      ok: true,
      status: 200,
      content: list,
      msg: ''
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
