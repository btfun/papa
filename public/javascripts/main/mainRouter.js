define(function(require){
'use strict'

 /* 模块主路由
  * 店铺应用主路由文件
  *
  *
  */

   const routes = [
     { path:'', redirect:'/home' },
     //店铺主页部分
     { path: '/home',            component: resolve => require(['home.indexModule'],resolve),
       children: [
         //邮件设置
         { path: 'mail/setUp',   component: resolve => require(['home.mailSetUp.indexModule'],resolve) },
         //爬虫设置
         { path: 'papa/setUp',   component: resolve => require(['home.papaSetUp.indexModule'],resolve) },
         //邮件编辑
         { path: 'mail/Edit',    component: resolve => require(['home.mailEdit.indexModule'],resolve) },
         //excel文件清洗
         { path: 'list/Edit',    component: resolve => require(['home.listEdit.indexModule'],resolve) }
       ]
      }
     //营业记录部分
    //  { path: '/business',    component: resolve => require(['busi.busiModule'], resolve) },
    //  { path: '/comment',     component: resolve => require(['busi.commentModule'], resolve) },
    //  { path: '/cross',       component: resolve => require(['busi.crossModule'], resolve) }


   ]

   return routes;

});
