define(function(require){
'use strict'

 /* 模块主路由
  * 店铺应用主路由文件
  *
  *
  */

   const routes = [
    //  { path:'', redirect:'/index' },
     //店铺主页部分
     { path: '/',         component: resolve => require(['shop.indexModule'],resolve) },
    //  { path: '/individual',    component: resolve => require(['shop.orderModule'],resolve),
    //      children: [
    //        { path: 'cost',     component: resolve => require(['shop.order.costModule'],resolve) },
    //        { path: 'open',     component: resolve => require(['shop.order.openModule'],resolve) },
    //        { path: 'recharge', component: resolve => require(['shop.order.rechargeModule'],resolve) },
    //        { path: 'upgrade',  component: resolve => require(['shop.order.upgradeModule'],resolve) }
    //      ]
    //   },
     //营业记录部分
     { path: '/business',    component: resolve => require(['busi.busiModule'], resolve) },
     { path: '/comment',     component: resolve => require(['busi.commentModule'], resolve) },
     { path: '/cross',       component: resolve => require(['busi.crossModule'], resolve) }


   ]

   return routes;

});
