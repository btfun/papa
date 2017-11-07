/**
* 配置文件
*
*/
module.exports ={
  //redis 配置文件
  redis: {
    client1:{
      name: 'BeidouRedis1',
      host: '192.168.20.113',
      port: '6379',
      timeout: '5000',
      password: 'mljia'
    },
    client2:{
      name: 'BeidouRedis2',
      host: '192.168.20.114',
      port: '6379',
      timeout: '5000',
      password: 'mljia'
    }
  },
  //email 配置文件
  email: {
    host : "smtp.exmail.qq.com",
    port : 25,
    user : "devtest@mljia.cn",
    pass : "beauty123",
    from : "devtest@mljia.cn",
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
