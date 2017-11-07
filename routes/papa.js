var request = require('request');
var cheerio= require('cheerio');

var conf = require("../conf");
var ualist=conf.UA;

function GetRandomNum(Min,Max){
  var Range = Max - Min;
  var Rand = Math.random();
  return(Min + Math.round(Rand * Range));
}

var papa=function(searchUrl){
  // google搜索结果的爬取,需要处理
  // 1.ip轮询
  // 2.ua随机
  // 3.domain随机
  // 4.休眠

  function reqPage(){
    request({
      url: searchUrl,
      headers: {
        'User-Agent' : ualist[GetRandomNum(0, ualist.length-1)] //随机UA
      }
    }, function (error, response, body) {
       if (!error && response.statusCode == 200) {
         //1 加载页面, 分析页面抓取URL， 防止被封IP，
         var $=cheerio.load(body);


       }
   })

  }


  // request(searchUrl|| 'http://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=led%20strip', function (error, response, body) {
  //  if (!error && response.statusCode == 200) {
  //         //1 加载页面
  //         var $=cheerio.load(body)
  //         //2 加载主要数据页面html
  //         console.log('-------------',$('#content_left').find('.result').length)
  //         //3 解析出链接url,和关键字凭据 存入数据库
  //
  //         //3.1 加载下一页，计数
  //
  //         //4 加载对应的url,分析页面是否有需要的数据（邮箱地址）
  //
  //
  //         $('#content_left').find('.result').each(function(index, element){
  //           var href=$(this).find('.t').find('a').attr('href');
  //           console.log(`==${index}======${href}`)
  //         })
  //
  //
  //     }else{
  //         // console.log(error)
  //     }
  //
  // });

}



module.exports=papa;
