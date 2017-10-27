var express = require('express');
var router = express.Router();
var dateV=new Date();
var timeStamp= 'v='+dateV.getFullYear()+(dateV.getMonth()+1)+dateV.getDate()+dateV.getHours()+dateV.getMinutes();
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        var extname = path.extname(file.originalname);//获取文件扩展名
        // 将保存文件名设置为 字段名 + 时间戳+文件扩展名，比如 logo-1478521468943.jpg
        cb(null, file.fieldname + '-' + Date.now() + extname);
    }
});

// var upload = multer({storage: storage});

/* 登录 */
router.get('/login', function(req, res, next) {
console.log('登录', req.ip)

  res.render('login', {
    version :  timeStamp
   });
});



/* 主页 */
router.get('/', function(req, res, next) {
  console.log('进来了', req.ip)

  // if(!req.cookies.token){
  //   res.redirect('/login');
  // }

  res.render('index', {
    version :  timeStamp
   });
});


var upload = multer({ dest: '../uploads'});

/* 上传附件图片 */
router.post('/upload', upload.array('file'), function(req, res, next) {
  // if(!req.cookies.token){
  //   return res.send({
  //     status: 400,
  //     err_msg: 'token 不合法'
  //   });
  // }
  // req.xhr,req.ip

  var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);

  res.send({
      status: 200,
      err_msg: ''
    });

  // upload(req, res, function (err) {
  //     if (err) {
  //       // An error occurred when uploading
  //       return
  //     }
  //     res.send({
  //         status: 200,
  //         err_msg: ''
  //       });
  //   })

});


module.exports = router;
