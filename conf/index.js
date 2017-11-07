/**
* 配置文件
*
*/
module.exports ={
  //redis 配置文件
  redis: {

  },
  //email 配置文件
  email: {
    host : "smtp-mail.outlook.com",
    port : 587,
    user : "battle1989@hotmail.com",
    pass : "guobin1989",
    from : "battle1989@hotmail.com",
    //收件人列表
    receivers   : [
      "battle@mljia.cn",
      "",
      "",
      ""
    ]
  },
  googleDo:[
    ".com", ".hk", ".as", ".im", ".com.co", ".co.uz", ".com", ".hk", ".com", ".hk"
  ],
  UA:[
    { "chrome" : "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36"},
    { "360"  :   "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"},
    { "edge" :   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393"},
    { "uc"   :   "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 UBrowser/6.0.1471.3 Safari/537.36"}

  ]

}
